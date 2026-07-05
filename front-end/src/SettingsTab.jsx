// src/SettingsTab.jsx
import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import { 
  User, Paintbrush, Bell, Shield, Database, Sun, Moon, 
  Check, Trash2, Download, Save 
} from 'lucide-react';

export default function SettingsTab({ currentTheme = 'orange', onThemeChange }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [profile, setProfile] = useState({ name: 'Beau', handle: 'beau_paws', bio: 'Cat lover & proud parent of Sunshine! 🐾' });
  const [notifs, setNotifs] = useState({ likes: true, comments: true, follows: true, achievements: true, dnd: false });
  const [privacy, setPrivacy] = useState({ privateAccount: false });

  const theme = catThemes[currentTheme] || catThemes.orange;

  const cardBg = isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-100 text-slate-800';
  const inputBg = isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700';
  const sectionHeaderColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  const menuItems = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'appearance', label: 'Theme & Appearance', icon: Paintbrush },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'storage', label: 'Storage & Data', icon: Database },
  ];

  const handleSave = () => {
    alert("Settings saved successfully! ✨");
  };

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-300 shadow-xs ${
      isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50/50 border-slate-200/80'
    }`}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200/60">
        <div>
          <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span>⚙️</span> Settings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Customize your profile preferences and app experience.</p>
        </div>

        {/* LIGHT / DARK MODE TOGGLE */}
        <div className="flex items-center p-1 bg-slate-200/60 rounded-full border border-slate-300/60 shadow-inner">
          <button 
            onClick={() => setIsDarkMode(false)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              !isDarkMode ? 'bg-white shadow-xs text-amber-500' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sun className="w-3.5 h-3.5" /> Light
          </button>
          <button 
            onClick={() => setIsDarkMode(true)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              isDarkMode ? 'bg-slate-900 shadow-xs text-indigo-400' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Moon className="w-3.5 h-3.5" /> Dark
          </button>
        </div>
      </div>

      {/* TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: NAVIGATION RAIL */}
        <div className="md:col-span-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all text-left whitespace-nowrap active:scale-98 ${
                  isSelected 
                    ? 'text-white shadow-xs' 
                    : `${isDarkMode ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100'}`
                }`}
                style={{ backgroundColor: isSelected ? theme.primary : 'transparent' }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: MAIN CONFIG PANE */}
        <div className="md:col-span-3">
          <div className={`border p-6 rounded-2xl space-y-6 shadow-2xs ${cardBg}`}>
            
            {/* PROFILE SECTION */}
            {activeSection === 'profile' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${sectionHeaderColor}`}>Public Profile</h3>
                
                <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-14 h-14 rounded-full bg-slate-100 border flex items-center justify-center text-2xl shadow-xs" style={{ borderColor: theme.primary }}>
                    🐱
                  </div>
                  <div>
                    <button className="px-3 py-1.5 text-xs font-bold text-white rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: theme.primary }}>
                      Change Avatar
                    </button>
                    <span className="text-[11px] text-slate-400 block mt-1">Supports JPG, PNG or custom emojis.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Display Name</label>
                    <input type="text" className={`w-full px-3 py-2 text-xs font-medium border rounded-xl focus:outline-none ${inputBg}`} value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Profile Handle</label>
                    <input type="text" className={`w-full px-3 py-2 text-xs font-medium border rounded-xl focus:outline-none ${inputBg}`} value={profile.handle} onChange={(e) => setProfile({...profile, handle: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Bio</label>
                  <textarea rows="3" className={`w-full px-3 py-2 text-xs font-medium border rounded-xl resize-none focus:outline-none ${inputBg}`} value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} />
                </div>
              </div>
            )}

            {/* THEME & APPEARANCE */}
            {activeSection === 'appearance' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${sectionHeaderColor}`}>Theme Hub</h3>
                <p className="text-xs text-slate-500">Pick an interactive color framework to apply across your workspace dashboard tabs.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.keys(catThemes).map((tKey) => {
                    const currentTarget = catThemes[tKey];
                    const isActive = currentTheme === tKey;
                    return (
                      <button
                        key={tKey}
                        onClick={() => onThemeChange?.(tKey)}
                        className={`p-3 border text-left rounded-xl transition-all flex flex-col justify-between h-20 relative active:scale-98 ${
                          isActive ? 'bg-slate-50 shadow-xs' : 'bg-transparent hover:bg-slate-50/40'
                        }`}
                        style={{ borderColor: isActive ? theme.primary : 'rgba(156,163,175,0.2)' }}
                      >
                        <span className="text-xs font-bold capitalize tracking-tight" style={{ color: currentTarget.primary }}>{tKey} Theme</span>
                        <div className="flex gap-1.5 mt-2">
                          <span className="w-4 h-4 rounded-full border shadow-inner inline-block" style={{ backgroundColor: currentTarget.primary }} />
                          <span className="w-4 h-4 rounded-full border shadow-inner inline-block" style={{ backgroundColor: currentTarget.cardBg }} />
                        </div>
                        {isActive && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white" style={{ backgroundColor: theme.primary }}>
                            <Check className="w-2 h-2 stroke-[4px]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeSection === 'notifications' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${sectionHeaderColor}`}>Notification Settings</h3>
                
                <div className="divide-y divide-slate-100 space-y-3">
                  {[
                    { key: 'likes', label: 'Likes Activity alerts', desc: 'Notify me when someone likes an activity update.' },
                    { key: 'comments', label: 'Commentary dialogue feed', desc: 'Alert me on comment threads posted inside my network profile.' },
                    { key: 'follows', label: 'Follower updates', desc: 'Trigger indicators when other cat parents follow back.' },
                    { key: 'achievements', label: 'Badge milestone alerts', desc: 'Congratulate me when custom cat care badges clear.' },
                  ].map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between pt-3 first:pt-0">
                      <div className="max-w-md pr-4">
                        <label className="text-xs font-bold block text-slate-800">{pref.label}</label>
                        <span className="text-[11px] text-slate-400 block">{pref.desc}</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifs[pref.key]} 
                        onChange={(e) => setNotifs({...notifs, [pref.key]: e.target.checked})}
                        className="w-4 h-4 rounded-md border cursor-pointer"
                        style={{ accentColor: theme.primary }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRIVACY & SECURITY */}
            {activeSection === 'privacy' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${sectionHeaderColor}`}>Privacy Visibilities</h3>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="max-w-md">
                    <h4 className="text-xs font-bold text-slate-800">Private Sanctuary Mode</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">When active, only accepted followers can view your cat logs, pictures, and achievement lists.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={privacy.privateAccount} 
                    onChange={(e) => setPrivacy({...privacy, privateAccount: e.target.checked})}
                    className="w-4 h-4 rounded-md border cursor-pointer"
                    style={{ accentColor: theme.primary }}
                  />
                </div>
              </div>
            )}

            {/* STORAGE & DATA */}
            {activeSection === 'storage' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${sectionHeaderColor}`}>Local Cache & Storage Assets</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Clear Storage Cache</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Flush pre-loaded timeline images and temporary layout buffers to clear up memory space.</p>
                    </div>
                    <button onClick={() => alert("Cache cleared successfully.")} className="w-fit px-3 py-1.5 text-[11px] font-bold bg-rose-50 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-100 flex items-center gap-1.5 transition-all active:scale-95">
                      <Trash2 className="w-3.5 h-3.5" /> Clear Cache (4.2 MB)
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Export Settings Logs</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Compile all configurations and layout achievements into a downloadable manifest structural JSON document.</p>
                    </div>
                    <button onClick={() => alert("Compiling log data...")} className="w-fit px-3 py-1.5 text-[11px] font-bold bg-slate-100 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center gap-1.5 transition-all active:scale-95">
                      <Download className="w-3.5 h-3.5" /> Export Data Logs
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* BUTTON FOOTER */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button className="px-4 py-2 text-xs font-bold border bg-white hover:bg-slate-50 text-slate-700 rounded-lg transition-colors">
                Discard Changes
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 text-xs font-bold text-white shadow-xs flex items-center gap-1.5 rounded-lg active:scale-95 transition-all hover:opacity-95"
                style={{ backgroundColor: theme.primary }}
              >
                <Save className="w-3.5 h-3.5" /> Save Configuration
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}