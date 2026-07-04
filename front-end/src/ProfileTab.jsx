// src/ProfileTab.jsx
import React from 'react';
import { catThemes } from './themeStyles';
import { Edit3, MapPin, Calendar, Heart, MessageCircle, MapPin as PinIcon } from 'lucide-react';

export default function ProfileTab({ currentTheme = 'orange' }) {
  const theme = catThemes[currentTheme] || catThemes.orange;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* =========================================================================
          LEFT/CENTER COLUMN: Profile Banner, Bio & Posts Grid
          ========================================================================= */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Profile Card Container */}
        <div className="rounded-2xl overflow-hidden border shadow-sm bg-white" style={{ borderColor: theme.border }}>
          {/* Visual Banner Area */}
          <div className="h-44 bg-gradient-to-r relative p-6 flex items-end justify-end"
               style={{ backgroundImage: `linear-gradient(to right, ${theme.cardBg}, ${theme.border})` }}>
            <span className="text-white/40 font-black text-xl tracking-widest uppercase select-none">
              Cats make life better ♥
            </span>
          </div>
          
          {/* Detailed Profile Avatar Bio Row */}
          <div className="px-6 pb-6 relative pt-16 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="w-28 h-28 rounded-full border-4 bg-white shadow-md absolute -top-14 left-6 flex items-center justify-center overflow-hidden"
                 style={{ borderColor: theme.background }}>
              <span className="text-5xl select-none">🐈</span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                Cinnamon <span className="text-base">🐾</span>
              </h1>
              <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">@cinnamon.escapes</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: theme.text }}>
                Professional room escaper, yarn disentangler, and treat sample tester. Living life one nap at a time.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold opacity-75">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> India</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined July 2026</span>
              </div>
            </div>

            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border shadow-sm transition-transform hover:scale-[1.02] whitespace-nowrap bg-white"
                    style={{ borderColor: theme.border }}>
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>

          {/* Metrics Counters Sub-Row */}
          <div className="grid grid-cols-3 border-t text-center py-4 bg-slate-50/50" style={{ borderColor: theme.border }}>
            <div>
              <p className="text-xl font-black">6</p>
              <p className="text-xs font-medium opacity-60">Posts</p>
            </div>
            <div className="border-x" style={{ borderColor: theme.border }}>
              <p className="text-xl font-black">1.2k</p>
              <p className="text-xs font-medium opacity-60">Followers</p>
            </div>
            <div>
              <p className="text-xl font-black">180</p>
              <p className="text-xs font-medium opacity-60">Following</p>
            </div>
          </div>
        </div>

        {/* Inner Content Sub-Navigation Filtering Ribbon */}
        <div className="flex gap-6 border-b text-sm font-bold px-2" style={{ borderColor: theme.border }}>
          <span className="border-b-2 pb-2 cursor-pointer transition-colors" style={{ borderColor: theme.primary, color: theme.primary }}>Posts</span>
          <span className="opacity-50 hover:opacity-100 pb-2 cursor-pointer transition-opacity">Saved</span>
          <span className="opacity-50 hover:opacity-100 pb-2 cursor-pointer transition-opacity">Liked</span>
          <span className="opacity-50 hover:opacity-100 pb-2 cursor-pointer transition-opacity">Comments</span>
        </div>

        {/* Content Showcase Multi-Column Masonry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { id: 1, text: "Plotting my next escape attempt from the laundry basket.", tags: "#cardboardbox #escape" },
            { id: 2, text: "Found a perfect square patch of sunlight on the rug.", tags: "#sunbath #chill" },
          ].map(post => (
            <div key={post.id} className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4"
                 style={{ borderColor: theme.border }}>
              <p className="text-sm font-medium">{post.text}</p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold" style={{ color: theme.primary }}>{post.tags}</span>
                <div className="flex gap-3 opacity-60 text-xs font-bold">
                  <span className="flex items-center gap-1 cursor-pointer hover:opacity-100"><Heart className="w-4 h-4" /> 12</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:opacity-100"><MessageCircle className="w-4 h-4" /> 4</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* =========================================================================
          RIGHT COLUMN: Achievements Sub-Panel Block Card
          ========================================================================= */}
      <div className="space-y-6">
        <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: theme.border }}>
          <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2">
            🏆 Achievements Unlocked
          </h3>
          <div className="space-y-4">
            {[
              { title: "Box Enthusiast", desc: "Level 3", icon: "📦" },
              { title: "Snooze Master", desc: "Helped 25+ people", icon: "💤" },
              { title: "Treat Snatcher", desc: "10 Posts", icon: "🐟" },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border bg-slate-50/50" style={{ borderColor: theme.border }}>
                <span className="text-xl p-2 bg-white rounded-lg shadow-sm border" style={{ borderColor: theme.border }}>{badge.icon}</span>
                <div>
                  <p className="text-sm font-bold tracking-tight">{badge.title}</p>
                  <p className="text-xs font-medium opacity-60">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}