// src/App.jsx
import React, { useState } from 'react';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import MarketplaceTab from './MarketplaceTab';
import GameScreen from './GameScreen';
import { catThemes } from './themeStyles';
import { 
  Home, Gamepad2, ShoppingBag, User, Bell, Settings, Info, Search, PlusCircle 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('orange');
  const theme = catThemes[currentTheme] || catThemes.orange;

  // The active content controller mapping your clean layout modules
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomeTab currentTheme={currentTheme} />;
      case 'game':
          return <GameScreen currentTheme={currentTheme} />;
      case 'adoption':
        return <MarketplaceTab currentTheme={currentTheme} />;
      case 'profile':
        return <ProfileTab currentTheme={currentTheme} />;
      case 'notifications':
        return <div className="p-8 text-center font-bold bg-white rounded-2xl border">🔔 Notifications Channel Coming Soon!</div>;
      case 'settings':
        return <div className="p-8 text-center font-bold bg-white rounded-2xl border">⚙️ Configuration Settings Coming Soon!</div>;
      case 'about':
        return <div className="p-8 text-center font-bold bg-white rounded-2xl border">ℹ️ About Us Project Specs Coming Soon!</div>;
      default:
        return <HomeTab currentTheme={currentTheme} />;
    }
  };

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
    <div className="flex min-h-screen font-sans antialiased transition-colors duration-300" 
         style={{ backgroundColor: theme.background, color: theme.text }}>
      
      {/* =========================================================================
          LEFT SIDEBAR NAVIGATION MODULE
          ========================================================================= */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between fixed h-full z-10"
             style={{ borderColor: theme.border }}>
        <div>
          {/* Brand Identity Label */}
          <div className="flex items-center gap-2 mb-8 px-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-black tracking-tight" style={{ color: theme.primary }}>PawSpace</span>
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
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 group ${
                    isActive ? 'shadow-sm font-extrabold' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.cardBg : 'transparent',
                    color: isActive ? theme.primary : theme.text
                  }}
                >
                  <IconComponent className="w-5 h-5 transition-transform group-hover:scale-105" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Floating Actions Addon Trigger */}
        <div className="pt-4 border-t" style={{ borderColor: theme.border }}>
          <button className="w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: theme.primary, color: theme.background }}>
            <PlusCircle className="w-4 h-4" />
            Add Post
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN APPLICATION RUNTIME LAYOUT SHELL
          ========================================================================= */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        
        {/* Top Header Search Deck utility section */}
        <header className="h-16 border-b bg-white/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20"
                style={{ borderColor: theme.border }}>
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input 
              type="text" 
              placeholder="Search cats, people, posts..." 
              className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-full bg-white border outline-none focus:ring-2 transition-all"
              style={{ borderColor: theme.border }}
            />
          </div>
          
          {/* Quick Realtime Active Theme Configuration Toggles */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border shadow-sm" style={{ borderColor: theme.border }}>
              {Object.keys(catThemes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setCurrentTheme(themeKey)}
                  className="w-6 h-6 rounded-full border text-[9px] font-black flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: catThemes[themeKey].primary, 
                    borderColor: currentTheme === themeKey ? theme.text : 'transparent',
                    color: catThemes[themeKey].background
                  }}
                  title={`Switch to ${themeKey}`}
                >
                  {themeKey[0].toUpperCase()}
                </button>
              ))}
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 flex items-center justify-center overflow-hidden shadow-sm" style={{ borderColor: theme.primary }}>
              <span className="text-xs">🐱</span>
            </div>
          </div>
        </header>

        {/* Target viewport injection viewport segment box */}
        <main className="p-8 flex-1">
          <div>
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}