// src/Navbar.jsx
import React from 'react';
import { catThemes } from './themeStyles';
import { 
  Home, Gamepad2, ShoppingBag, User, Bell, Settings, Info, Search 
} from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab, currentTheme, setCurrentTheme }) {
  const theme = catThemes[currentTheme] || catThemes.orange;

  const navigationItems = [
    { id: 'home', label: 'Home Feed', icon: Home },
    { id: 'game', label: 'Game Learn', icon: Gamepad2 },
    { id: 'adoption', label: 'Adoption Marketplace', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  return (
    <>
      {/* =========================================================================
          LEFT SIDEBAR NAVIGATION MODULE
          ========================================================================= */}
      <aside 
        className="w-64 bg-white border-r p-6 flex flex-col justify-between fixed h-full z-10 tracking-tight"
        style={{ borderColor: theme.border }}
      >
        <div>
          {/* Brand Identity Label */}
          <div className="flex items-center gap-2 mb-8 px-2 select-none">
            <span className="text-xl">🐾</span>
            <span className="text-base font-semibold text-slate-800">PawSpace</span>
          </div>

          {/* Core Navigation Triggers */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-150 group active:scale-98 ${
                    isActive ? 'shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.cardBg : 'transparent',
                    color: isActive ? theme.primary : undefined
                  }}
                >
                  <IconComponent className={`w-4 h-4 transition-colors ${isActive ? '' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* =========================================================================
          TOP HEADER SEARCH DECK UTILITY SECTION
          ========================================================================= */}
      <header 
        className="h-16 border-b bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20 pl-72 tracking-tight"
        style={{ borderColor: theme.border }}
      >
        {/* Search Input Box */}
        <div className="relative w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search cats, communities, topics..." 
            className="w-full pl-9 pr-4 py-1.5 text-xs font-normal rounded-xl bg-slate-50 border border-slate-100 outline-none focus:bg-white focus:border-slate-200 transition-all text-slate-600"
          />
        </div>
        
        {/* Quick Active Theme Configuration Toggles & Profile Circle Link */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-slate-100 shadow-sm">
            {Object.keys(catThemes).map((themeKey) => (
              <button
                key={themeKey}
                onClick={() => setCurrentTheme(themeKey)}
                className={`w-5 h-5 rounded-full border transition-all hover:scale-110 active:scale-90 flex items-center justify-center text-[8px] font-semibold ${
                  currentTheme === themeKey ? 'ring-2 ring-offset-1 ring-slate-300' : ''
                }`}
                style={{ 
                  backgroundColor: catThemes[themeKey].primary, 
                  borderColor: 'transparent',
                  color: catThemes[themeKey].background
                }}
                title={`Switch to ${themeKey} theme`}
              >
                {themeKey[0].toUpperCase()}
              </button>
            ))}
          </div>

          {/* Profile Circle Avatar Component Node: Leads directly to Profile Tab */}
          <div 
            className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:border-slate-300 transition-all shadow-sm select-none active:scale-95"
            title="View your Profile"
            onClick={() => setCurrentTab('profile')}
          >
            <span className="text-sm">🐱</span>
          </div>
        </div>
      </header>
    </>
  );
}