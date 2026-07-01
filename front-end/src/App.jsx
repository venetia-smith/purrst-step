import React, { useState } from 'react';
import GameScreen from './GameScreen';
import SocialTab from './SocialTab';
import MarketplaceTab from './MarketplaceTab';
import ProfileTab from './ProfileTab';
import { BookOpen, Users, ShoppingBag, User } from 'lucide-react';

export default function App() {
  // Setup dynamic tab routing architecture matching specs
  const [activeTab, setActiveTab] = useState('learn');

  // Dynamic Content Router Module Engine
  const renderTabContent = () => {
    switch (activeTab) {
      case 'learn':
        return <GameScreen />;
      case 'social':
        return <SocialTab />;
      case 'marketplace':
        return <MarketplaceTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <GameScreen />;
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', // Warm soft neutralize light backdrop base
      fontFamily: '"Quicksand", "Nunito", system-ui, -apple-system, sans-serif',
      color: '#334155'
    }}>
      
      {/* ================= HEADER SECTION ================= */}
      <header style={{
        padding: '30px 20px',
        background: 'linear-gradient(135deg, #fae8ff 0%, #fce7f3 100%)', // Soft Ghibli Purple/Pink cloud gradient
        borderBottom: '2px solid #f3e8ff',
        textAlign: 'center',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)'
      }}>
        <h1 style={{
          margin: '0 0 8px 0',
          fontSize: '42px',
          fontWeight: '800',
          color: '#7e22ce', // Warm Deep Purple Accent
          letterSpacing: '-0.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          🐱 PurrstStep Portal
        </h1>
        <p style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '500',
          color: '#a21caf', // Secondary Warm Fuchsia Text
        }}>
          A cozy path to companion discovery, social sharing, and interactive gaming
        </p>
      </header>

      {/* ================= TAB NAVIGATION SECTION ================= */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px 20px 12px 20px',
        backgroundColor: '#f8fafc',
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          maxWidth: '1280px',
          width: '100%'
        }}>
          
          <button 
            onClick={() => setActiveTab('learn')}
            style={tabButtonStyle(activeTab === 'learn', 'purple')}
          >
            <BookOpen size={18} /> Learn & Play
          </button>

          <button 
            onClick={() => setActiveTab('social')}
            style={tabButtonStyle(activeTab === 'social', 'cyan')}
          >
            <Users size={18} /> Community Posts
          </button>

          <button 
            onClick={() => setActiveTab('marketplace')}
            style={tabButtonStyle(activeTab === 'marketplace', 'green')}
          >
            <ShoppingBag size={18} /> Cats & Market
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            style={tabButtonStyle(activeTab === 'profile', 'indigo')}
          >
            <User size={18} /> Explorer Profile
          </button>

        </div>
      </nav>

      {/* ================= DYNAMIC VIEWPORT WINDOW ================= */}
      <main style={{ 
        flexGrow: 1, 
        width: '100%',
        maxWidth: '1280px', 
        margin: '0 auto',
        padding: '12px 24px 40px 24px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          animation: 'fadeIn 0.4s ease-out',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.04)',
          padding: '20px'
        }}>
          {renderTabContent()}
        </div>
      </main>

      {/* Embedded Global Soft Keyframes for UI Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}

// Ghibli Spec Adaptive Button Styling Factory Module
function tabButtonStyle(isActive, themeColor) {
  // Dynamic color configuration system maps directly to specs definitions
  const themes = {
    purple: { bg: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', text: '#6b21a8', border: '#d8b4fe' },
    cyan: { bg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)', text: '#115e59', border: '#99f6e4' },
    green: { bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', text: '#166534', border: '#bbf7d0' },
    indigo: { bg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', text: '#3730a3', border: '#a5b4fc' }
  };

  const currentTheme = themes[themeColor] || themes.purple;

  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 26px',
    borderRadius: '24px', // Hard specification target 24px radius high bubble layout
    border: isActive ? `2px solid ${currentTheme.border}` : '2px solid transparent',
    background: isActive ? currentTheme.bg : 'rgba(241, 245, 249, 0.8)',
    color: isActive ? currentTheme.text : '#64748b',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '15px',
    fontFamily: 'inherit',
    boxShadow: isActive ? '0 10px 20px -6px rgba(0,0,0,0.06)' : 'none',
    transform: isActive ? 'scale(1.03)' : 'scale(1)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none'
  };
}