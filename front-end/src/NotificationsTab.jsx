import React, { useState, useEffect } from 'react';
import { catThemes } from './themeStyles';
import { Heart, MessageSquare, UserPlus, Trophy, Trash2 } from 'lucide-react';
import { apiFetch } from './lib/api';

export default function NotificationsTab({ currentTheme = 'orange' }) {
  const theme = catThemes[currentTheme] || catThemes.orange;

  const [activeFilter, setActiveFilter] = useState('All');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      setErrorMessage('');

      const data = await apiFetch('/api/notifications');

      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error('Notifications fetch error:', err);
      setNotifications([]);

      if (err.message === 'Missing auth token' || err.message === 'Invalid auth token') {
        setErrorMessage('Please sign in to view your notifications.');
      } else {
        setErrorMessage('Could not load notifications right now.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleClearAll = async () => {
    try {
      await apiFetch('/api/notifications/clear', {
        method: 'POST'
      });

      setNotifications([]);
    } catch (err) {
      console.error('Clear notifications error:', err);

      if (err.message === 'Missing auth token' || err.message === 'Invalid auth token') {
        setErrorMessage('Please sign in to clear notifications.');
      } else {
        setErrorMessage('Could not clear notifications right now.');
      }
    }
  };

  const filters = ['All', 'Likes', 'Comments', 'Follows', 'Achievements'];

  const getIcon = (type) => {
    if (type === 'Likes') return { icon: Heart, bg: 'bg-rose-50 text-rose-500' };
    if (type === 'Comments') return { icon: MessageSquare, bg: 'bg-sky-50 text-sky-500' };
    if (type === 'Follows') return { icon: UserPlus, bg: 'bg-green-50 text-green-500' };
    return { icon: Trophy, bg: 'bg-amber-50 text-amber-500' };
  };

  const filteredNotifications =
    activeFilter === 'All'
      ? notifications
      : notifications.filter((item) => item.type === activeFilter);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            🔔 Notifications
          </h2>

          <button
            onClick={handleClearAll}
            className="text-[10px] font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Clear All
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
          <div className="flex gap-1 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-xs font-bold transition-all rounded-lg ${
                  activeFilter === filter ? 'text-white shadow-xs' : 'text-slate-500'
                }`}
                style={{
                  backgroundColor: activeFilter === filter ? theme.primary : 'transparent'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-400 italic">
            Fetching updates from the kitty network...
          </p>
        ) : errorMessage ? (
          <div className="p-5 bg-white rounded-xl border border-slate-200 text-center">
            <p className="text-sm font-semibold text-slate-700">{errorMessage}</p>
            <p className="text-xs text-slate-400 mt-1">
              Auth connection is coming next.
            </p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-5 bg-white rounded-xl border border-slate-200 text-center">
            <p className="text-sm font-semibold text-slate-700">No notifications yet.</p>
            <p className="text-xs text-slate-400 mt-1">
              Your likes, comments, follows, and achievements will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((item) => {
              const { icon: Icon, bg: iconBg } = getIcon(item.type);

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-base border border-slate-200">
                        🐱
                      </div>

                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${iconBg} flex items-center justify-center border shadow-xs`}>
                        <Icon className="w-2 h-2" />
                      </div>
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs text-slate-700 truncate">
                        <span className="font-bold text-slate-900 mr-1">User</span>
                        {item.text}
                      </p>

                      {item.detail && (
                        <p className="text-[11px] text-slate-500 italic bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md inline-block max-w-md truncate">
                          {item.detail}
                        </p>
                      )}

                      <span className="text-[10px] text-slate-400 block">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}