// src/SettingsTab.jsx
import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import {
  User,
  Paintbrush,
  Bell,
  Shield,
  Database,
  Sun,
  Moon,
  Check,
  Trash2,
  Download,
  Save
} from 'lucide-react';

export default function SettingsTab({
  theme,
  currentTheme = 'orange',
  onThemeChange,
  isDarkMode = false,
  onDarkModeToggle
}) {
  const [activeSection, setActiveSection] = useState('profile');

  const [profile, setProfile] = useState({
    name: 'Beau',
    handle: 'beau_paws',
    bio: 'Cat lover & proud parent of Sunshine! 🐾'
  });

  const [notifs, setNotifs] = useState({
    likes: true,
    comments: true,
    follows: true,
    achievements: true,
    dnd: false
  });

  const [privacy, setPrivacy] = useState({ privateAccount: false });

  const activeTheme = theme || catThemes[currentTheme] || catThemes.orange;

  const panelStyle = {
    backgroundColor: activeTheme.cardBg,
    borderColor: activeTheme.border,
    color: activeTheme.text
  };

  const softStyle = {
    backgroundColor: activeTheme.softBg || activeTheme.background,
    borderColor: activeTheme.border,
    color: activeTheme.text
  };

  const inputStyle = {
    backgroundColor: activeTheme.inputBg || activeTheme.background,
    borderColor: activeTheme.border,
    color: activeTheme.text
  };

  const menuItems = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'appearance', label: 'Theme & Appearance', icon: Paintbrush },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'storage', label: 'Storage & Data', icon: Database }
  ];

  const handleSave = () => {
    alert('Settings saved successfully! ✨');
  };

  return (
    <div
      className="p-6 rounded-3xl border transition-all duration-300 shadow-xs"
      style={{
        backgroundColor: activeTheme.background,
        borderColor: activeTheme.border,
        color: activeTheme.text
      }}
    >
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b"
        style={{ borderColor: activeTheme.border }}
      >
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span>⚙️</span> Settings
          </h2>
          <p className="text-xs mt-0.5" style={{ color: activeTheme.textMuted }}>
            Customize your profile preferences and app experience.
          </p>
        </div>

        <div
          className="flex items-center p-1 rounded-full border shadow-inner"
          style={{
            backgroundColor: activeTheme.cardBg,
            borderColor: activeTheme.border
          }}
        >
          <button
            onClick={() => onDarkModeToggle?.(false)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all"
            style={{
              backgroundColor: !isDarkMode ? activeTheme.primary : 'transparent',
              color: !isDarkMode ? '#ffffff' : activeTheme.textMuted
            }}
          >
            <Sun className="w-3.5 h-3.5" /> Light
          </button>
          <button
            onClick={() => onDarkModeToggle?.(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all"
            style={{
              backgroundColor: isDarkMode ? activeTheme.primary : 'transparent',
              color: isDarkMode ? '#ffffff' : activeTheme.textMuted
            }}
          >
            <Moon className="w-3.5 h-3.5" /> Dark
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition-all text-left whitespace-nowrap active:scale-98"
                style={{
                  backgroundColor: isSelected ? activeTheme.primary : 'transparent',
                  color: isSelected ? '#ffffff' : activeTheme.textMuted
                }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="md:col-span-3">
          <div className="border p-6 rounded-2xl space-y-6 shadow-2xs" style={panelStyle}>
            {activeSection === 'profile' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: activeTheme.textMuted }}>
                  Public Profile
                </h3>

                <div className="flex items-center gap-4 p-4 border rounded-xl" style={softStyle}>
                  <div
                    className="w-14 h-14 rounded-full border flex items-center justify-center text-2xl shadow-xs"
                    style={{
                      borderColor: activeTheme.primary,
                      backgroundColor: activeTheme.cardBg
                    }}
                  >
                    🐱
                  </div>
                  <div>
                    <button
                      className="px-3 py-1.5 text-xs font-bold text-white rounded-lg hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: activeTheme.primary }}
                    >
                      Change Avatar
                    </button>
                    <span className="text-[11px] block mt-1" style={{ color: activeTheme.textMuted }}>
                      Supports JPG, PNG or custom emojis.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold" style={{ color: activeTheme.text }}>
                      Display Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-xs font-medium border rounded-xl focus:outline-none"
                      style={inputStyle}
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold" style={{ color: activeTheme.text }}>
                      Profile Handle
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-xs font-medium border rounded-xl focus:outline-none"
                      style={inputStyle}
                      value={profile.handle}
                      onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold" style={{ color: activeTheme.text }}>
                    Bio
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 text-xs font-medium border rounded-xl resize-none focus:outline-none"
                    style={inputStyle}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: activeTheme.textMuted }}>
                  Theme Hub
                </h3>
                <p className="text-xs" style={{ color: activeTheme.textMuted }}>
                  Pick a color theme and choose light or dark mode for the whole app.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.keys(catThemes).map((tKey) => {
                    const currentTarget = catThemes[tKey];
                    const isActive = currentTheme === tKey;

                    return (
                      <button
                        key={tKey}
                        onClick={() => onThemeChange?.(tKey)}
                        className="p-3 border text-left rounded-xl transition-all flex flex-col justify-between h-20 relative active:scale-98"
                        style={{
                          borderColor: isActive ? activeTheme.primary : activeTheme.border,
                          backgroundColor: isActive ? `${activeTheme.primary}12` : activeTheme.cardBg
                        }}
                      >
                        <span className="text-xs font-bold capitalize tracking-tight" style={{ color: currentTarget.primary }}>
                          {currentTarget.name}
                        </span>
                        <div className="flex gap-1.5 mt-2">
                          <span className="w-4 h-4 rounded-full border shadow-inner inline-block" style={{ backgroundColor: currentTarget.primary }} />
                          <span className="w-4 h-4 rounded-full border shadow-inner inline-block" style={{ backgroundColor: currentTarget.cardBg }} />
                        </div>
                        {isActive && (
                          <div
                            className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white"
                            style={{ backgroundColor: activeTheme.primary }}
                          >
                            <Check className="w-2 h-2 stroke-[4px]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: activeTheme.textMuted }}>
                  Notification Settings
                </h3>

                <div className="space-y-3">
                  {[
                    { key: 'likes', label: 'Likes Activity alerts', desc: 'Notify me when someone likes an activity update.' },
                    { key: 'comments', label: 'Commentary dialogue feed', desc: 'Alert me on comment threads posted inside my network profile.' },
                    { key: 'follows', label: 'Follower updates', desc: 'Trigger indicators when other cat parents follow back.' },
                    { key: 'achievements', label: 'Badge milestone alerts', desc: 'Congratulate me when custom cat care badges clear.' }
                  ].map((pref) => (
                    <div
                      key={pref.key}
                      className="flex items-center justify-between border rounded-xl p-3"
                      style={softStyle}
                    >
                      <div className="max-w-md pr-4">
                        <label className="text-xs font-bold block" style={{ color: activeTheme.text }}>
                          {pref.label}
                        </label>
                        <span className="text-[11px] block" style={{ color: activeTheme.textMuted }}>
                          {pref.desc}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifs[pref.key]}
                        onChange={(e) => setNotifs({ ...notifs, [pref.key]: e.target.checked })}
                        className="w-4 h-4 rounded-md border cursor-pointer"
                        style={{ accentColor: activeTheme.primary }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: activeTheme.textMuted }}>
                  Privacy & Security
                </h3>

                <div className="flex items-center justify-between p-4 border rounded-xl" style={softStyle}>
                  <div className="max-w-md">
                    <h4 className="text-xs font-bold" style={{ color: activeTheme.text }}>
                      Private Sanctuary Mode
                    </h4>
                    <p className="text-[11px] mt-0.5" style={{ color: activeTheme.textMuted }}>
                      When active, only accepted followers can view your cat logs, pictures, and achievement lists.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacy.privateAccount}
                    onChange={(e) => setPrivacy({ ...privacy, privateAccount: e.target.checked })}
                    className="w-4 h-4 rounded-md border cursor-pointer"
                    style={{ accentColor: activeTheme.primary }}
                  />
                </div>
              </div>
            )}

            {activeSection === 'storage' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: activeTheme.textMuted }}>
                  Local Cache & Storage Assets
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-xl flex flex-col justify-between gap-3" style={softStyle}>
                    <div>
                      <h4 className="text-xs font-bold" style={{ color: activeTheme.text }}>
                        Clear Storage Cache
                      </h4>
                      <p className="text-[11px] mt-0.5" style={{ color: activeTheme.textMuted }}>
                        Flush pre-loaded timeline images and temporary layout buffers.
                      </p>
                    </div>
                    <button
                      onClick={() => alert('Cache cleared successfully.')}
                      className="w-fit px-3 py-1.5 text-[11px] font-bold border rounded-lg flex items-center gap-1.5 transition-all active:scale-95"
                      style={{
                        backgroundColor: '#fff1f2',
                        borderColor: '#fecdd3',
                        color: '#e11d48'
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear Cache
                    </button>
                  </div>

                  <div className="p-4 border rounded-xl flex flex-col justify-between gap-3" style={softStyle}>
                    <div>
                      <h4 className="text-xs font-bold" style={{ color: activeTheme.text }}>
                        Export Settings Logs
                      </h4>
                      <p className="text-[11px] mt-0.5" style={{ color: activeTheme.textMuted }}>
                        Compile settings into a downloadable demo manifest.
                      </p>
                    </div>
                    <button
                      onClick={() => alert('Compiling log data...')}
                      className="w-fit px-3 py-1.5 text-[11px] font-bold border rounded-lg flex items-center gap-1.5 transition-all active:scale-95"
                      style={{
                        backgroundColor: activeTheme.cardBg,
                        borderColor: activeTheme.border,
                        color: activeTheme.text
                      }}
                    >
                      <Download className="w-3.5 h-3.5" /> Export Data Logs
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: activeTheme.border }}>
              <button
                className="px-4 py-2 text-xs font-bold border rounded-lg transition-colors"
                style={{
                  backgroundColor: activeTheme.cardBg,
                  borderColor: activeTheme.border,
                  color: activeTheme.text
                }}
              >
                Discard Changes
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 text-xs font-bold text-white shadow-xs flex items-center gap-1.5 rounded-lg active:scale-95 transition-all hover:opacity-95"
                style={{ backgroundColor: activeTheme.primary }}
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
