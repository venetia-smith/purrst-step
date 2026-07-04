// src/App.jsx
import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import { 
  Home, Gamepad2, ShoppingBag, User, Bell, Settings, Info, 
  Search, PlusCircle, Heart, MessageCircle, Bookmark, Edit3, MapPin, Calendar
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('profile');
  const [currentTheme, setCurrentTheme] = useState('orange');
  const theme = catThemes[currentTheme];

  // Simulated layout navigation list updated to match user request requirements
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'game', label: 'Game Learn', icon: Gamepad2 },
    { id: 'adoption', label: 'Adoption Marketplace', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  return (
    <div className="flex min-h-screen font-sans antialiased selection:bg-orange-200 transition-colors duration-300" 
         style={{ backgroundColor: theme.background, color: theme.text }}>
      
      {/* =========================================================================
          LEFT SIDEBAR NAVIGATION (Matches file_000000000aa071f8acb56c774bb96b70.png Structure)
          ========================================================================= */}
      <aside className="w-64 bg-white/80 backdrop-blur-md border-r p-6 flex flex-col justify-between fixed h-full z-10"
             style={{ borderColor: theme.border }}>
        <div>
          {/* Logo Brand Header */}
          <div className="flex items-center gap-2 mb-8 px-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-black tracking-tight" style={{ color: theme.primary }}>PawSpace</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 group ${
                    isActive ? 'shadow-sm' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.cardBg : 'transparent',
                    color: isActive ? theme.primary : theme.text
                  }}
                >
                  <IconComponent className="w-5 h-5 transition-transform group-hover:scale-105" 
                                 style={{ color: isActive ? theme.primary : 'inherit' }} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Action Trigger Button */}
        <div className="pt-4 border-t" style={{ borderColor: theme.border }}>
          <button className="w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: theme.primary, color: theme.background }}>
            <PlusCircle className="w-4 h-4" />
            Add Post
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN APPLICATION INTERACTIVE WRAPPER SPACE
          ========================================================================= */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        
        {/* --- TOP GLOBAL HEADER SEARCH UTIL BAR --- */}
        <header className="h-16 border-b bg-white/40 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20"
                style={{ borderColor: theme.border }}>
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input 
              type="text" 
              placeholder="Search cats, people, posts..." 
              className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-full bg-white border outline-none focus:ring-2 transition-all"
              style={{ borderColor: theme.border, '--tw-ring-color': theme.primary }}
            />
          </div>
          
          {/* Quick Realtime Active Layout Configuration Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-white/80 p-1 rounded-full border shadow-sm" style={{ borderColor: theme.border }}>
              {Object.keys(catThemes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setCurrentTheme(themeKey)}
                  className="w-6 h-6 rounded-full border capitalize text-[9px] font-black flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: catThemes[themeKey].primary, 
                    borderColor: currentTheme === themeKey ? theme.text : 'transparent',
                    color: catThemes[themeKey].background
                  }}
                  title={`Switch to ${themeKey}`}
                >
                  {themeKey[0]}
                </button>
              ))}
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 overflow-hidden shadow-sm" style={{ borderColor: theme.primary }}>
              <div className="w-full h-full flex items-center justify-center bg-orange-100 font-bold text-xs">🐱</div>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC TAB CONTROLLER HUB RENDERING PANEL --- */}
        <main className="p-8 flex-1">
          {currentTab === 'profile' ? (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* CENTRAL BLOCK COLUMNS: Hero Content Layout Grid */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Visual Banner Block Card */}
                <div className="rounded-2xl overflow-hidden border shadow-sm bg-white" style={{ borderColor: theme.border }}>
                  <div className="h-44 bg-gradient-to-r relative p-6 flex items-end justify-end"
                       style={{ backgroundImage: `linear-gradient(to right, ${theme.cardBg}, ${theme.border})` }}>
                    <span className="text-white/40 font-black text-2xl tracking-widest uppercase select-none">Cats make life better ♥</span>
                  </div>
                  
                  {/* Detailed Profile Avatar Bio Meta Frame Row */}
                  <div className="px-6 pb-6 relative pt-16 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="w-28 h-28 rounded-full border-4 bg-white shadow-md absolute -top-14 left-6 flex items-center justify-center overflow-hidden"
                         style={{ borderColor: theme.background }}>
                      <span className="text-5xl">🐈</span>
                    </div>
                    
                    <div>
                      <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                        Cinnamon <span className="text-base">🐾</span>
                      </h1>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">@cinnamon.escapes</p>
                      <p className="text-sm max-w-lg leading-relaxed mb-4">
                        Professional room escaper, yarn disentangler, and treat sample tester. Living life one nap at a time.
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs font-bold opacity-75">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> India</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined July 2026</span>
                      </div>
                    </div>

                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border shadow-sm transition-transform hover:scale-[1.02]"
                            style={{ borderColor: theme.border, backgroundColor: theme.cardBg }}>
                      <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                  </div>

                  {/* Dynamic Stats Banner Metrics Row */}
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

                {/* Sub-navigation Context Feeds Row */}
                <div className="flex gap-6 border-b text-sm font-bold px-2" style={{ borderColor: theme.border }}>
                  <span className="border-b-2 pb-2 cursor-pointer" style={{ borderColor: theme.primary, color: theme.primary }}>Posts</span>
                  <span className="opacity-50 hover:opacity-100 pb-2 cursor-pointer transition-opacity">Saved</span>
                  <span className="opacity-50 hover:opacity-100 pb-2 cursor-pointer transition-opacity">Liked</span>
                </div>

                {/* Simulated Content Dashboard Grid Cards Mapping */}
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

              {/* RIGHT SIDEBAR COLUMN: Achievements Side Card Panels Block */}
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
          ) : (
            /* Placeholder state fallbacks for tracking alternative views cleanly */
            <div className="text-center py-20 bg-white/60 backdrop-blur-sm border border-dashed rounded-2xl" style={{ borderColor: theme.border }}>
              <span className="text-4xl block mb-2">🚧</span>
              <h2 className="text-xl font-black capitalize">{currentTab.replace('-', ' ')} Content Panel</h2>
              <p className="text-sm opacity-60 max-w-xs mx-auto mt-1">Ready to link or paste your custom data modules directly into this component.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}