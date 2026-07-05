// src/NotificationsTab.jsx
import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import { 
  Heart, MessageSquare, UserPlus, Trophy, Check, ArrowRight
} from 'lucide-react';

export default function NotificationsTab({ currentTheme = 'orange' }) {
  const theme = catThemes[currentTheme] || catThemes.orange;
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Likes', 'Comments', 'Follows', 'Achievements'];

  const catImages = {
    windowCat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=120&auto=format&fit=crop&q=60',
    cuteCat: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=120&auto=format&fit=crop&q=60',
    calicoCat: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=120&auto=format&fit=crop&q=60',
    badgeCat: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=120&auto=format&fit=crop&q=60',
    playfulCat: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=120&auto=format&fit=crop&q=60',
    curiousCat: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=120&auto=format&fit=crop&q=60'
  };

  const newNotifications = [
    { id: 1, type: 'Likes', user: { name: 'WhiskerLover', avatar: '🐱' }, text: 'liked your post.', detail: '"Sunshine enjoying the window seat ☀️🐱"', time: '2m ago', unread: true, icon: Heart, iconBg: 'bg-rose-50 text-rose-500', imgUrl: catImages.windowCat },
    { id: 2, type: 'Comments', user: { name: 'PawParent', avatar: '🧑‍💻' }, text: 'commented on your post.', detail: '"So adorable! What breed is Sunshine? 😻"', time: '5m ago', unread: true, icon: MessageSquare, iconBg: 'bg-sky-50 text-sky-500', imgUrl: catImages.cuteCat },
    { id: 3, type: 'Follows', user: { name: 'MeowMagic', avatar: '🧙‍♀️' }, text: 'started following you.', time: '10m ago', unread: true, icon: UserPlus, iconBg: 'bg-green-50 text-green-500', action: 'Follow Back', imgUrl: catImages.calicoCat },
    { id: 4, type: 'Achievements', user: { name: 'Congratulations!', avatar: '🏆' }, text: 'You earned a new badge.', detail: '"Cat Care Beginner"', time: '15m ago', unread: true, icon: Trophy, iconBg: 'bg-amber-50 text-amber-500', badge: '🎖️', imgUrl: catImages.badgeCat }
  ];

  const earlierNotifications = [
    { id: 5, type: 'Likes', user: { name: 'CatBuddy', avatar: '🐾' }, text: 'liked your post.', time: '1h ago', unread: false, icon: Heart, iconBg: 'bg-rose-50 text-rose-500', imgUrl: catImages.playfulCat },
    { id: 6, type: 'Comments', user: { name: 'Simran', avatar: '👩' }, text: 'commented on your post.', detail: '"This toy is perfect! My cat has the same one 😍"', time: '2h ago', unread: false, icon: MessageSquare, iconBg: 'bg-sky-50 text-sky-500', imgUrl: catImages.curiousCat }
  ];

  const summaryStats = [
    { label: 'Likes', count: 3, icon: Heart, color: 'text-rose-500' },
    { label: 'Comments', count: 2, icon: MessageSquare, color: 'text-sky-500' },
    { label: 'Follows', count: 1, icon: UserPlus, color: 'text-green-500' },
    { label: 'Achievements', count: 2, icon: Trophy, color: 'text-amber-500' }
  ];

  const filterList = (list) => {
    if (activeFilter === 'All') return list;
    return list.filter(item => item.type === activeFilter);
  };

  const renderNotificationCard = (item) => {
    const Icon = item.icon;
    return (
      /* ✅ ADDED: rounded-xl to notification feed items */
      <div key={item.id} className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-50/60 rounded-xl border border-slate-200 transition-all group shadow-2xs">
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-base border border-slate-200">
              {item.user.avatar}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${item.iconBg} flex items-center justify-center border shadow-xs`}>
              <Icon className="w-2 h-2" />
            </div>
          </div>

          <div className="space-y-0.5 min-w-0">
            <p className="text-xs text-slate-700 truncate">
              <span className="font-bold text-slate-900 mr-1">{item.user.name}</span>
              {item.text}
            </p>
            {item.detail && (
              /* ✅ ADDED: rounded-md to inner code tag previews */
              <p className="text-[11px] text-slate-500 italic bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md inline-block max-w-md truncate">
                {item.detail}
              </p>
            )}
            <span className="text-[10px] text-slate-400 block">{item.time}</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 shrink-0 ml-4">
          {item.action && (
            /* ✅ ADDED: rounded-lg to actionable chips */
            <button className="px-3 py-1 text-[10px] font-bold border bg-white shadow-xs rounded-lg transition-all active:scale-95 hover:bg-slate-50"
                    style={{ borderColor: theme.primary, color: theme.primary }}>
              {item.action}
            </button>
          )}
          {item.badge && <div className="text-xl">{item.badge}</div>}
          
          {item.imgUrl && (
            /* ✅ ADDED: rounded-lg to image preview cards */
            <div className="w-10 h-10 border border-slate-200 rounded-lg overflow-hidden bg-slate-100 shadow-3xs">
              <img src={item.imgUrl} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}

          {item.unread && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span>🔔</span> Notifications
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Stay updated with your latest interactive logs.</p>
        </div>

        {/* ✅ ADDED: rounded-xl to filter navbar pill tracks */}
        <div className="flex items-center justify-between gap-4 bg-slate-100/80 p-1 rounded-xl border border-slate-200 overflow-x-auto scrollbar-none">
          <div className="flex gap-1">
            {filters.map((filter) => (
              /* ✅ ADDED: rounded-lg to state button items */
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-xs font-bold transition-all rounded-lg ${
                  activeFilter === filter ? 'text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                style={{ backgroundColor: activeFilter === filter ? theme.primary : 'transparent' }}
              >
                {filter}
              </button>
            ))}
          </div>

          <button className="text-slate-400 hover:text-slate-600 px-3 flex items-center gap-1 text-[10px] font-bold whitespace-nowrap">
            <Check className="w-3 h-3" /> Clear All
          </button>
        </div>

        <div className="space-y-4">
          {filterList(newNotifications).length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold tracking-wider uppercase text-slate-400 px-1">New Updates</h3>
              <div className="space-y-2">{filterList(newNotifications).map(renderNotificationCard)}</div>
            </div>
          )}

          {filterList(earlierNotifications).length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold tracking-wider uppercase text-slate-400 px-1">Earlier</h3>
              <div className="space-y-2">{filterList(earlierNotifications).map(renderNotificationCard)}</div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        
        {/* ✅ ADDED: rounded-xl to Activity Summary panel box */}
        <div className="bg-white border rounded-xl p-4 space-y-3 shadow-2xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-2">Activity Summary</h3>
          <div className="divide-y divide-slate-100">
            {summaryStats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="flex items-center justify-between py-2 text-xs font-medium first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <StatIcon className={`w-3.5 h-3.5 ${stat.color}`} />
                    <span>{stat.label}</span>
                  </div>
                  {/* ✅ ADDED: rounded-md to simple stat integers counters */}
                  <span className="bg-slate-50 px-1.5 py-0.5 border rounded-md text-slate-700 text-[10px] font-bold">{stat.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ ADDED: rounded-xl to Achievements tracking container panel */}
        <div className="bg-white border rounded-xl p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Achievements</h3>
            <button className="text-[10px] font-bold flex items-center gap-0.5" style={{ color: theme.primary }}>
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-2">
            {[
              { title: 'Cat Care Beginner', text: 'Learned basic rules setup.', emoji: '🏠', bg: 'bg-purple-50', imgUrl: catImages.windowCat },
              { title: 'Helping Paws', text: 'Donated core item tools.', emoji: '❤️', bg: 'bg-rose-50', imgUrl: catImages.playfulCat }
            ].map((ach, idx) => (
              /* ✅ ADDED: rounded-xl and rounded-md parameters to inner layout components */
              <div key={idx} className="flex items-center justify-between gap-2 p-1.5 border border-slate-100 hover:border-slate-200 transition-all bg-slate-50/50 rounded-xl">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg ${ach.bg} flex items-center justify-center text-xs shadow-3xs shrink-0`}>
                    {ach.emoji}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{ach.title}</h4>
                    <p className="text-[10px] text-slate-400 truncate">{ach.text}</p>
                  </div>
                </div>

                <div className="w-9 h-9 border border-slate-200 rounded-lg overflow-hidden shrink-0 bg-slate-100 shadow-3xs">
                  <img src={ach.imgUrl} alt={ach.title} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}