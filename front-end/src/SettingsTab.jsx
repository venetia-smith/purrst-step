// src/SettingsTab.jsx
import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import { 
  User, Paintbrush, Bell, Shield, Database, Sun, Moon, 
  Check, ShieldAlert, Trash2, Download, Save, RefreshCw 
} from 'lucide-react';

export default function SettingsTab({ currentTheme = 'orange', onThemeChange }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Local states for settings inputs
  const [profile, setProfile] = useState({ name: 'Beau', handle: 'beau_paws', bio: 'Cat lover & proud parent of Sunshine! 🐾' });
  const [notifs, setNotifs] = useState({ likes: true, comments: true, follows: true, achievements: true, dnd: false });
  const [privacy, setPrivacy] = useState({ privateAccount: false });

  const theme = catThemes[currentTheme] || catThemes.orange;

  // Custom colors computed dynamically to provide a much stronger themed background context
  const cardBg = isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-100 text-slate-800';
  const inputBg = isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700';
  const sectionHeaderColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const subtextColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  const menuItems = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'appearance', label: 'Theme & Appearance', icon: Paintbrush },
    { id: 'notifications', label: 'Notifications config', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'storage', label: 'Storage & Data', icon: Database },
  ];

  const handleSave = () => {
    alert("Configuration parameters written to disk successfully! ✨");
  };

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-500 shadow-xl ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-slate-800' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 border-slate-200'
    }`}
    style={{
      // Infusing subtle theme accents directly into the container backdrop canvas glow
      boxShadow: `0 20px 40px -15px ${theme.primary}15`
    }}>
      
      {/* HEADER SPECS SECTION ROW */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200/40">
        <div>
          <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span>⚙️</span> System Settings
          </h2>
          <p className={`text-sm mt-0.5 ${subtextColor}`}>Manage your environment configs, appearance matrices, and profile nodes.</p>
        </div>

        {/* LIGHT MODE VS DARK MODE LIGHTNING TOGGLE */}
        <div className="flex items-center p-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-full border backdrop-blur-sm shadow-inner">
          <button 
            onClick={() => setIsDarkMode(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all ${
              !isDarkMode ? 'bg-white shadow-sm text-amber-500' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" /> Light
          </button>
          <button 
            onClick={() => setIsDarkMode(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all ${
              isDarkMode ? 'bg-slate-900 shadow-sm text-indigo-400' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Moon className="w-3.5 h-3.5" /> Dark
          </button>
        </div>
      </div>

      {/* TWO-COLUMN CONTROL DASHBOARD MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: NAVIGATION RAIL BAR */}
        <div className="md:col-span-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all text-left whitespace-nowrap ${
                  isSelected 
                    ? 'shadow-sm text-white scale-[1.02]' 
                    : `${isDarkMode ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
                }`}
                style={{
                  backgroundColor: isSelected ? theme.primary : 'transparent'
                }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: MAIN CONFIG PANE SCROLLER */}
        <div className="md:col-span-3">
          <div className={`border p-6 rounded-2xl shadow-sm space-y-6 ${cardBg}`}>
            
            {/* ================= 👤 SUBSECTION: PROFILE SETTINGS ================= */}
            {activeSection === 'profile' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderColor}`}>Public Profile Metadata</h3>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-500/5 border border-slate-500/10">
                  <div className="w-16 h-16 rounded-full bg-slate-200 border-2 flex items-center justify-center text-3xl shadow-sm" style={{ borderColor: theme.primary }}>
                    🐱
                  </div>
                  <div>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-black text-white shadow-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: theme.primary }}>
                      Change Avatar
                    </button>
                    <span className={`text-[11px] block mt-1.5 ${subtextColor}`}>Supports JPG, PNG or custom emojis. Max 2MB.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold opacity-80">Display Name</label>
                    <input type="text" className={`w-full px-3 py-2 rounded-xl text-sm font-semibold focus:outline-none border focus:ring-2`} style={{ '--tw-ring-color': theme.primary }} value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className={`w-full px-3 py-2 rounded-xl text-sm font-semibold ${inputBg}`} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold opacity-80">Profile Handle</label>
                    <input type="text" className={`w-full px-3 py-2 rounded-xl text-sm font-semibold ${inputBg}`} value={profile.handle} onChange={(e) => setProfile({...profile, handle: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold opacity-80">Bio</label>
                  <textarea rows="3" className={`w-full px-3 py-2 rounded-xl text-sm font-semibold resize-none ${inputBg}`} value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} />
                </div>
              </div>
            )}

            {/* ================= 🎨 SUBSECTION: THEME & INTERFACE ================= */}
            {activeSection === 'appearance' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderColor}`}>Theme Hub Palette Preview</h3>
                <p className={`text-xs ${subtextColor}`}>Pick an interactive identity framework to apply across your core sidebar tabs.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.keys(catThemes).map((tKey) => {
                    const currentTarget = catThemes[tKey];
                    const isActive = currentTheme === tKey;
                    return (
                      <button
                        key={tKey}
                        onClick={() => onThemeChange?.(tKey)}
                        className={`p-3 rounded-xl border-2 text-left transition-all hover:scale-[1.02] flex flex-col justify-between h-20 relative ${
                          isActive ? 'shadow-md bg-slate-500/5' : 'bg-transparent'
                        }`}
                        style={{ borderColor: isActive ? theme.primary : 'rgba(156,163,175,0.15)' }}
                      >
                        <span className="text-xs font-black capitalize tracking-tight" style={{ color: currentTarget.primary }}>{tKey} Theme</span>
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

            {/* ================= 🔔 SUBSECTION: NOTIFICATIONS Preferences ================= */}
            {activeSection === 'notifications' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderColor}`}>Notification Engine Config</h3>
                
                <div className="divide-y divide-slate-100/10 space-y-3">
                  {[
                    { key: 'likes', label: 'Post Likes Activity alerts', desc: 'Notify me when someone likes an activity node.' },
                    { key: 'comments', label: 'Commentary dialogue stream', desc: 'Alert me on comment threads posted inside my network frames.' },
                    { key: 'follows', label: 'Follower onboarding telemetry', desc: 'Trigger indicators when other cat parents follow back.' },
                    { key: 'achievements', label: 'Badge milestone triggers', desc: 'Congratulate me when custom cat care badges clear.' },
                  ].map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between pt-3 first:pt-0">
                      <div className="max-w-md pr-4">
                        <label className="text-xs font-black block">{pref.label}</label>
                        <span className={`text-[11px] block ${subtextColor}`}>{pref.desc}</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifs[pref.key]} 
                        onChange={(e) => setNotifs({...notifs, [pref.key]: e.target.checked})}
                        className="w-4 h-4 rounded accent-orange-500 cursor-pointer"
                        style={{ accentColor: theme.primary }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-xl border border-rose-200/40 bg-rose-500/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-rose-500">Global Do Not Disturb</h4>
                    <p className={`text-[11px] ${subtextColor}`}>Mute all sound effect alerts completely across game windows and tabs.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifs.dnd} 
                    onChange={(e) => setNotifs({...notifs, dnd: e.target.checked})}
                    className="w-4 h-4 rounded accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* ================= 🔒 SUBSECTION: PRIVACY & SECURITY ================= */}
            {activeSection === 'privacy' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderColor}`}>Privacy Visibility Controls</h3>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-500/5 border border-slate-500/10">
                  <div className="max-w-md">
                    <h4 className="text-xs font-black">Private Sanctuary Mode</h4>
                    <p className={`text-[11px] ${subtextColor}`}>When active, only accepted followers can view your cat logs, pictures, and achievement lists.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={privacy.privateAccount} 
                    onChange={(e) => setPrivacy({...privacy, privateAccount: e.target.checked})}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: theme.primary }}
                  />
                </div>

                <div className="p-4 rounded-xl border border-amber-200/40 bg-amber-500/5 flex gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-amber-600 dark:text-amber-400">Security Credentials Protocol</h4>
                    <p className={`text-[11px] mt-0.5 ${subtextColor}`}>To modify your login key password or secure authentication tokens, please interface through standard remote verification sequences.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 📦 SUBSECTION: STORAGE & DATA ================= */}
            {activeSection === 'storage' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className={`text-xs font-black uppercase tracking-wider ${sectionHeaderColor}`}>Local Cache & Workspace Assets</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100/10 bg-slate-500/5 flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-black">Clear Temporary Storage</h4>
                      <p className={`text-[11px] mt-0.5 ${subtextColor}`}>Flush pre-loaded timeline feed images and layout buffers to clean space.</p>
                    </div>
                    <button onClick={() => alert("Local client database cache cleared successfully.")} className="w-fit px-3 py-1.5 rounded-lg text-[11px] font-black bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 flex items-center gap-1.5 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Clear Cache (4.2 MB)
                    </button>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100/10 bg-slate-500/5 flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-black">Export Workspace Manifest</h4>
                      <p className={`text-[11px] mt-0.5 ${subtextColor}`}>Compile all your uploaded posts, achievements, and configurations into a downloadable structural JSON document.</p>
                    </div>
                    <button onClick={() => alert("Compiling structural schema log file...")} className="w-fit px-3 py-1.5 rounded-lg text-[11px] font-black bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 flex items-center gap-1.5 transition-colors">
                      <Download className="w-3.5 h-3.5" /> Export Data Logs
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ACTION BANNER UTILITY BUTTON FOOTER ROW */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100/10">
              <button className="px-4 py-2 rounded-xl text-xs font-bold border hover:bg-slate-50 transition-colors bg-white text-slate-700">
                Discard Changes
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-transform hover:scale-[1.02] active:scale-95"
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