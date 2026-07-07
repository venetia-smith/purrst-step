// src/themeStyles.js

export const catThemes = {
  orange: {
    name: 'Ginger Tabby',
    primary: '#e07a3c',
    background: '#f6f5f0',
    sidebarBg: '#edeae0',
    headerBg: 'rgba(237, 234, 224, 0.8)',
    cardBg: '#ffffff',
    text: '#412f27',
    textMuted: '#8b7365',
    border: '#dedad0',
    isDark: false
  },

  calico: {
    name: 'Calico Gold',
    primary: '#f1931b',
    background: '#fef9e7',
    sidebarBg: '#fbeeb8',
    headerBg: 'rgba(251, 238, 184, 0.8)',
    cardBg: '#ffffff',
    text: '#744600',
    textMuted: '#ba8532',
    border: '#ebd395',
    isDark: false
  },

  britishshorthair: {
    name: 'British Shorthair',
    primary: '#769292',
    background: '#e4e4e7',
    sidebarBg: '#cbd2d2',
    headerBg: 'rgba(203, 210, 210, 0.8)',
    cardBg: '#f4f4f5',
    text: '#2e373e',
    textMuted: '#606b74',
    border: '#b8c1c1',
    isDark: false
  },

  siamese: {
    name: 'Siamese Sky',
    primary: '#85b3d1',
    background: '#f9f9f8',
    sidebarBg: '#f0ece6',
    headerBg: 'rgba(240, 236, 230, 0.8)',
    cardBg: '#ffffff',
    text: '#585a63',
    textMuted: '#8f9199',
    border: '#e1ded7',
    isDark: false
  }
};

export function getCatTheme(themeKey = 'orange', isDarkMode = false) {
  const baseTheme = catThemes[themeKey] || catThemes.orange;

  if (!isDarkMode) {
    return baseTheme;
  }

  return {
    ...baseTheme,
    name: `${baseTheme.name} Dark`,
    background: '#0f172a',
    sidebarBg: '#111827',
    headerBg: 'rgba(15, 23, 42, 0.88)',
    cardBg: '#1e293b',
    text: '#f8fafc',
    textMuted: '#cbd5e1',
    border: '#334155',
    inputBg: '#0b1120',
    softBg: '#172033',
    isDark: true
  };
}
