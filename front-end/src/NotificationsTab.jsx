// src/NotificationsTab.jsx
import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import { 
  Heart, MessageSquare, UserPlus, Trophy, AtSign, ShieldAlert, 
  Check, Sliders, Eye, ArrowRight, Sparkles, BellRing
} from 'lucide-react';

export default function NotificationsTab({ currentTheme = 'orange' }) {
  const theme = catThemes[currentTheme] || catThemes.orange;
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter configurations
  const filters = ['All', 'Likes', 'Comments', 'Follows', 'Mentions', 'Achievements', 'System'];

  // Mock notifications array mirroring the layout
  const newNotifications = [
    {
      id: 1,
      type: 'Likes',
      user: { name: 'WhiskerLover', avatar: '🐱' },
      text: 'liked your post.',
      detail: '"Sunshine enjoying the window seat ☀️🐱"',
      time: '2m ago',
      unread: true,
      icon: Heart,
      iconBg: 'bg-rose-50 text-rose-500',
      media: '🐈 shadow-sm'
    },
    {
      id: 2,
      type: 'Comments',
      user: { name: 'PawParent', avatar: '🧑‍💻' },
      text: 'commented on your post.',
      detail: '"So adorable! What breed is Sunshine? 😻"',
      time: '5m ago',
      unread: true,
      icon: MessageSquare,
      iconBg: 'bg-sky-50 text-sky-500',
      media: '🐈‍⬛ shadow-sm'
    },
    {
      id: 3,
      type: 'Follows',
      user: { name: 'MeowMagic', avatar: '🧙‍♀️' },
      text: 'started following you.',
      time: '10m ago',
      unread: true,
      icon: UserPlus,
      iconBg: 'bg-green-50 text-green-500',
      action: 'Follow Back'
    },
    {
      id: 4,
      type: 'Achievements',
      user: { name: 'Congratulations!', avatar: '🏆' },
      text: 'You earned a new badge.',
      detail: '"Cat Care Beginner"',
      time: '15m ago',
      unread: true,
      icon: Trophy,
      iconBg: 'bg-amber-50 text-amber-500',
      badge: '🎖️'
    }
  ];

  const earlierNotifications = [
    {
      id: 5,
      type: 'Likes',
      user: { name: 'CatBuddy', avatar: '🐾' },
      text: 'and 12 others liked your post.',
      time: '1h ago',
      unread: true,
      icon: Heart,
      iconBg: 'bg-rose-50 text-rose-500',
      facepile: ['🐱', '🐈', '🦁', '🐯']
    },
    {
      id: 6,
      type: 'Comments',
      user: { name: 'Simran', avatar: '👩' },
      text: 'commented on your post.',
      detail: '"This toy is perfect! My cat has the same one 😍"',
      time: '2h ago',
      unread: true,
      icon: MessageSquare,
      iconBg: 'bg-sky-50 text-sky-500',
      media: '🧸'
    },
    {
      id: 7,
      type: 'Achievements',
      user: { name: 'New achievement unlocked!', avatar: '✨' },
      text: '"Helping Paws" – Donated items to 5 pets in need.',
      time: '3h ago',
      unread: true,
      icon: Trophy,
      iconBg: 'bg-amber-50 text-amber-500',
      badge: '❤️'
    },
    {
      id: 8,
      type: 'Follows',
      user: { name: 'KittyKing', avatar: '👑' },
      text: 'and 3 others started following you.',
      time: '1d ago',
      unread: true,
      icon: UserPlus,
      iconBg: 'bg-green-50 text-green-500',
      facepile: ['🐱', '🐈‍⬛', '🦁']
    }
  ];

  const summaryStats = [
    { label: 'Likes', count: 3, icon: Heart, color: 'text-rose-500' },
    { label: 'Comments', count: 2, icon: MessageSquare, color: 'text-sky-500' },
    { label: 'Follows', count: 1, icon: UserPlus, color: 'text-green-500' },
    { label: 'Achievements', count: 2, icon: Trophy, color: 'text-amber-500' },
    { label: 'Mentions', count: 0, icon: AtSign, color: 'text-purple-500' },
    { label: 'System', count: 0, icon: ShieldAlert, color: 'text-slate-500' }
  ];

  const filterList = (list) => {
    if (activeFilter === 'All') return list;
    return list.filter(item => item.type === activeFilter);
  };

  const renderNotificationCard = (item) => {
    const Icon = item.icon;
    return (
      <div key={item.id} className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/60 rounded-2xl border border-slate-100 transition-all group">
        <div className="flex items-center gap-4 flex-1">
          {/* Action indicator node shape overlay */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg border">
              {item.user.avatar}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${item.iconBg} flex items-center justify-center border shadow-sm`}>
              <Icon className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Context lines text layout blocks */}
          <div className="space-y-0.5 max-w-xl">
            <p className="text-sm text-slate-700">
              <span className="font-bold text-slate-900 mr-1">{item.user.name}</span>
              {item.text}
            </p>
            {item.detail && (
              <p className="text-xs text-slate-500 font-medium italic bg-slate-50 border border-slate-100/70 px-2 py-1 rounded-lg inline-block">
                {item.detail}
              </p>
            )}
            <span className="text-[11px] font-medium text-slate-400 block">{item.time}</span>
          </div>
        </div>

        {/* Dynamic target attachments module (Media previews, Buttons or Badges) */}
        <div className="flex items-center gap-3">
          {item.action && (
            <button className="px-4 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 active:scale-95 bg-white"
                    style={{ borderColor: theme.primary, color: theme.primary }}>
              {item.action}
            </button>
          )}

          {item.media && (
            <div className="w-12 h-12 bg-slate-100 rounded-xl border flex items-center justify-center text-xl overflow-hidden shadow-inner">
              {item.media}
            </div>
          )}

          {item.badge && (
            <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-xl shadow-sm animate-pulse">
              {item.badge}
            </div>
          )}

          {item.facepile && (
            <div className="flex -space-x-2 overflow-hidden mr-2">
              {item.facepile.map((emoji, i) => (
                <div key={i} className="inline-block h-6 w-6 rounded-full bg-white border shadow-sm flex items-center justify-center text-xs">
                  {emoji}
                </div>
              ))}
            </div>
          )}

          {item.unread && (
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* ================= LEFT MAIN CONTEXT NOTIFICATIONS PANEL FEED ================= */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span>🔔</span> Notifications
          </h2>
          <p className="text-sm opacity-70 mt-0.5">Stay updated with all the purr-fect moments!</p>
        </div>

        {/* FILTER CHIPS GRID UTILITY ROW */}
        <div className="flex items-center justify-between gap-4 bg-white/40 p-1.5 rounded-2xl border border-slate-100 backdrop-blur-sm overflow-x-auto scrollbar-none">
          <div className="flex gap-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === filter 
                    ? 'shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                }`}
                style={{
                  backgroundColor: activeFilter === filter ? theme.primary : 'transparent',
                  color: activeFilter === filter ? theme.background : undefined
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-2 border-l border-slate-200">
            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold whitespace-nowrap">
              <Check className="w-3.5 h-3.5" /> Mark all as read
            </button>
            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors bg-white border border-slate-100 shadow-sm">
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FEED SECTION LISTS CONTAINER */}
        <div className="space-y-6">
          {/* NEW SECTION TIMELINE */}
          {filterList(newNotifications).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-black tracking-wider uppercase text-slate-400 px-1">New</h3>
              <div className="space-y-2">
                {filterList(newNotifications).map(renderNotificationCard)}
              </div>
            </div>
          )}

          {/* EARLIER SECTION TIMELINE */}
          {filterList(earlierNotifications).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-black tracking-wider uppercase text-slate-400 px-1">Earlier</h3>
              <div className="space-y-2">
                {filterList(earlierNotifications).map(renderNotificationCard)}
              </div>
            </div>
          )}

          {/* ALL CAUGHT UP REASSURANCE CAP OVERLAY */}
          {filterList(newNotifications).length === 0 && filterList(earlierNotifications).length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 font-bold">
              No notifications found matching this category.
            </div>
          )}

          <div className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center gap-2 py-6 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-inner">🐱🎉</div>
            <div>
              <h4 className="text-sm font-black text-slate-800">You're all caught up!</h4>
              <p className="text-xs text-slate-400 mt-0.5">Check back later for more updates.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT UTILITY CONTAINER RAILS ================= */}
      <div className="space-y-6">
        
        {/* PANEL 1: STATS SUMMARY INDEX */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-800 tracking-tight">Notification Summary</h3>
          <div className="divide-y divide-slate-50">
            {summaryStats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="flex items-center justify-between py-2.5 text-xs font-bold first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <StatIcon className={`w-4 h-4 ${stat.color}`} />
                    <span>{stat.label}</span>
                  </div>
                  <span className="bg-slate-50 px-2 py-0.5 rounded-md border text-slate-700 font-extrabold">{stat.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL 2: RECENT MINI ACHIEVEMENTS ACCORDION */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 tracking-tight">Your Achievements</h3>
            <button className="text-[11px] font-extrabold flex items-center gap-0.5" style={{ color: theme.primary }}>
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'Cat Care Beginner', text: 'Learned the basics of cat care', time: 'Earned today', emoji: '🍇', bg: 'bg-purple-50' },
              { title: 'Helping Paws', text: 'Donated items to 5 pets', time: 'Earned 2 days ago', emoji: '🍎', bg: 'bg-rose-50' },
              { title: 'Active Member', text: 'Logged in for 7 days in a row', time: 'Earned 5 days ago', emoji: '🥬', bg: 'bg-green-50' }
            ].map((ach, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <div className={`w-9 h-9 rounded-xl ${ach.bg} flex items-center justify-center text-sm shadow-sm`}>{ach.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-slate-800 truncate">{ach.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium truncate">{ach.text}</p>
                  <span className="text-[10px] font-bold text-slate-400 block mt-0.5">{ach.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 3: PEOPLE DISCOVERY PROFILES MODULE */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 tracking-tight">People You May Know</h3>
            <button className="text-[11px] font-extrabold flex items-center gap-0.5" style={{ color: theme.primary }}>
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'LunaLove', handle: '@lunalovecats', avatar: '🐱' },
              { name: 'Meow Diaries', handle: '@meowdiaries', avatar: '🐾' },
              { name: 'Pawsome Family', handle: '@pawsome.family', avatar: '👩‍👦' }
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 p-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border text-sm">{p.avatar}</div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-slate-800 truncate leading-tight">{p.name}</h4>
                    <span className="text-[10px] font-medium text-slate-400 block truncate">{p.handle}</span>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-full text-[11px] font-bold border bg-white shadow-sm hover:scale-105 active:scale-95 transition-transform"
                        style={{ borderColor: theme.border, color: theme.primary }}>
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 4: FLOATING CALL TO ACTION PUSH UTILITY NOTIFIER CARD */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col gap-3"
             style={{ borderColor: theme.border }}>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center text-lg shadow-sm">🐱</div>
            <div className="flex-1">
              <h4 className="text-xs font-black text-slate-800">Don't miss out!</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5 leading-relaxed">
                Enable notifications to stay updated with all the latest activities.
              </p>
            </div>
          </div>
          <button className="w-full py-2 rounded-xl text-xs font-bold shadow-sm transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: theme.primary, color: theme.background }}>
            Enable Now
          </button>
        </div>

      </div>

    </div>
  );
}