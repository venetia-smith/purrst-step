// src/App.jsx
import React, { useState } from 'react';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import MarketplaceTab from './MarketplaceTab';
import GameScreen from './GameScreen';
import NotificationsTab from './NotificationsTab';
import SettingsTab from './SettingsTab';
import { catThemes } from './themeStyles';
import { 
  Home, Gamepad2, ShoppingBag, User, Bell, Settings, Info, Search 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('orange');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = catThemes[currentTheme] || catThemes.orange;

  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomeTab theme={theme} onNavigate={(tab) => setCurrentTab(tab)} />;
      case 'game':
        return <GameScreen theme={theme} currentTheme={currentTheme} isDarkMode={isDarkMode} />;
      case 'adoption':
        return <MarketplaceTab theme={theme} currentTheme={currentTheme} isDarkMode={isDarkMode} />;
      case 'profile':
        return <ProfileTab theme={theme} isDarkMode={isDarkMode} />;
      
      {/* ✅ FIXED: Added explicit case handler for notifications tab view */}
      case 'notifications':
        return <NotificationsTab theme={theme} currentTheme={currentTheme} />;
        
      case 'settings':
        return (
          <SettingsTab 
            theme={theme}
            currentTheme={currentTheme} 
            onThemeChange={(newTheme) => setCurrentTheme(newTheme)} 
            isDarkMode={isDarkMode}
            onDarkModeToggle={setIsDarkMode} 
          />
        );
      case 'about':
        return (
          <div className="p-8 text-center font-medium text-xs rounded-2xl border transition-colors"
               style={{ backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.textMuted }}>
            ℹ️ About Us Project Specs Coming Soon!
          </div>
        );
      default:
        return <HomeTab theme={theme} onNavigate={(tab) => setCurrentTab(tab)} />;
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
    <div className="flex min-h-screen font-sans antialiased transition-colors duration-300 tracking-tight" 
         style={{ backgroundColor: theme.background, color: theme.text }}>
      
      <aside className="w-64 border-r p-6 flex flex-col justify-between fixed h-full z-10 transition-colors duration-300"
             style={{ backgroundColor: theme.sidebarBg, borderColor: theme.border }}>
        <div>
          <div className="flex items-center gap-2 mb-8 px-2 select-none">
            <span className="text-xl">🐾</span>
            <span className="text-base font-semibold tracking-tight transition-colors" style={{ color: theme.text }}>
              PawSpace
            </span>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-150 group active:scale-98 ${
                    isActive ? 'shadow-sm' : 'hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.cardBg : 'transparent',
                    color: isActive ? theme.primary : theme.textMuted
                  }}
                >
                  <IconComponent className="w-4 h-4 transition-transform group-hover:scale-102" 
                                 style={{ color: isActive ? theme.primary : 'inherit' }} />
                  <span style={{ color: isActive ? theme.text : 'inherit' }}>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <header className="h-16 border-b backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20 transition-colors duration-300"
                style={{ backgroundColor: theme.headerBg, borderColor: theme.border }}>
          <div className="relative w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" 
                    style={{ color: theme.textMuted }} />
            <input 
              type="text" 
              placeholder="Search cats, people, posts..." 
              className="w-full pl-9 pr-4 py-1.5 text-xs font-normal rounded-xl border outline-none transition-all"
              style={{ 
                backgroundColor: theme.cardBg, 
                borderColor: theme.border, 
                color: theme.text 
              }}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 p-1 rounded-full border shadow-sm transition-colors" 
                 style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
              {Object.keys(catThemes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setCurrentTheme(themeKey)}
                  className={`w-5 h-5 rounded-full border text-[8px] font-semibold flex items-center justify-center transition-all hover:scale-110 active:scale-90 ${
                    currentTheme === themeKey ? 'ring-2 ring-offset-1' : ''
                  }`}
                  style={{ 
                    backgroundColor: catThemes[themeKey].primary, 
                    borderColor: 'transparent',
                    color: '#ffffff',
                    '--tw-ring-color': theme.primary
                  }}
                  title={`Switch to ${catThemes[themeKey].name}`}
                >
                  {themeKey[0].toUpperCase()}
                </button>
              ))}
            </div>
            
            <div 
              className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition-all shadow-sm active:scale-95 select-none"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
              title="View your Profile"
              onClick={() => setCurrentTab('profile')}
            >
              <span className="text-sm">🐱</span>
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}