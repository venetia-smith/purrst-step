// src/AuthTab.jsx
import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import { supabase } from './lib/supabase';
import { apiFetch } from './lib/api';
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, Sparkles, Sun, Moon } from 'lucide-react';

export default function AuthTab({ currentTheme = 'orange' }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form input parameters
  const [formData, setFormData] = useState({ name: '', email: '', password: '', terms: false });

  const theme = catThemes[currentTheme] || catThemes.orange;

  // Adaptive environment styling variables
  const containerBg = isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800';
  const cardBg = isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-100';
  const inputBg = isDarkMode ? 'bg-slate-800/80 border-slate-700 text-slate-100' : 'bg-slate-100/70 border-slate-200 text-slate-800';
  const labelColor = isDarkMode ? 'text-slate-300' : 'text-slate-600';
  const subtextColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password
        });
  
        if (error) throw error;
  
        if (data.session) {
          await apiFetch('/api/auth/sync-user', {
            method: 'POST',
            body: JSON.stringify({
              display_name: formData.name
            })
          });
  
          alert('Account created and profile synced successfully!');
        } else {
          alert('Account created. Please check your email to confirm your account.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
  
        if (error) throw error;
  
        await apiFetch('/api/auth/sync-user', {
          method: 'POST',
          body: JSON.stringify({})
        });
  
        alert('Signed in successfully!');
      }
    } catch (err) {
      alert(err.message || 'Authentication failed');
    }
  };

  return (
    <div className={`min-h-[600px] w-full rounded-3xl border shadow-2xl overflow-hidden transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 ${containerBg}`}
         style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
      
      {/* ================= LEFT SIDE: RICH BRAND GRAPHIC BANNER ================= */}
      <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-10 overflow-hidden text-white bg-cover bg-center"
           style={{ 
             backgroundImage: "url('/assets/opening_scene.jpg')",
             backgroundColor: theme.primary 
           }}>
        {/* Dynamic Theme Color Overlay Matrix */}
        <div className="absolute inset-0 bg-gradient-to-b opacity-85" 
             style={{ backgroundImage: `linear-gradient(to bottom, ${theme.primary}DF, ${theme.cardBg}F0)` }} />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg shadow-sm border border-white/20">
            🐾
          </div>
          <span className="font-black text-xl tracking-tight">PawSpace</span>
        </div>

        {/* Dynamic Center Concept Cards */}
        <div className="relative z-10 space-y-4 my-auto max-w-sm bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">🐱</div>
          <blockquote className="text-sm font-semibold leading-relaxed">
            {isSignUp 
              ? "Join an exclusive collective of cat parents mapping out milestones, deciphering behaviors, and sharing digital sanctuaries." 
              : "Welcome back to your personalized configuration node. Your cats are waiting inside!"
            }
          </blockquote>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-bold tracking-wider opacity-80">
            <span>CHAPTER 01 // MEET MELLO</span>
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

        {/* Structural Footer Meta */}
        <div className="relative z-10 text-[11px] font-medium opacity-60 tracking-wide">
          © 2026 PAWSPACE PLATFORM. ALL RIGHTS RESERVED.
        </div>
      </div>

      {/* ================= RIGHT SIDE: HIGH-FIDELITY INTERACTIVE AUTH CORE ================= */}
      <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between relative">
        
        {/* UTILITY INTERACTION TOP ROW */}
        <div className="flex justify-end items-center gap-4 absolute top-6 right-8">
          {/* Light/Dark Toggle Controller */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border backdrop-blur-sm shadow-sm transition-all hover:scale-105 active:scale-95 ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-white border-slate-200 text-slate-500'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* MAIN AUTHENTICATION FORM WRAPPER */}
        <div className="my-auto max-w-md w-full mx-auto space-y-6 pt-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-white/40 inline-block shadow-sm mb-3"
                  style={{ color: theme.primary, borderColor: theme.border }}>
              {isSignUp ? 'Identity Initialization' : 'Secure Verification'}
            </span>
            <h2 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isSignUp ? 'Create your account' : 'Welcome back, explorer'}
            </h2>
            <p className={`text-xs mt-1 font-medium ${subtextColor}`}>
              {isSignUp ? 'Get started by configuring your parent profile space nodes.' : 'Please interface your registered credentials below.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* NAME CONTEXT FIELD BLOCK (Conditional display) */}
            {isSignUp && (
              <div className="space-y-1.5 animate-fadeIn">
                <label className={`text-xs font-black flex items-center gap-1.5 ${labelColor}`}>
                  <User className="w-3.5 h-3.5" /> Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Beau Paws"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none border focus:ring-2 transition-all ${inputBg}`}
                  style={{ '--tw-ring-color': theme.primary }}
                />
              </div>
            )}

            {/* EMAIL CONTEXT FIELD BLOCK */}
            <div className="space-y-1.5">
              <label className={`text-xs font-black flex items-center gap-1.5 ${labelColor}`}>
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <input 
                type="email" 
                placeholder="you@sanctuary.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none border focus:ring-2 transition-all ${inputBg}`}
                style={{ '--tw-ring-color': theme.primary }}
              />
            </div>

            {/* PASSWORD CONTEXT FIELD BLOCK */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className={`text-xs font-black flex items-center gap-1.5 ${labelColor}`}>
                  <Lock className="w-3.5 h-3.5" /> Security Key
                </label>
                {!isSignUp && (
                  <button type="button" className="text-[10px] font-black hover:underline" style={{ color: theme.primary }}>
                    Forgot Security Key?
                  </button>
                )}
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl text-xs font-semibold focus:outline-none border focus:ring-2 transition-all ${inputBg}`}
                  style={{ '--tw-ring-color': theme.primary }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* TERMS & CONTEXT SIGN UP CHECKBOX */}
            {isSignUp && (
              <div className="flex items-start gap-2.5 pt-1 animate-fadeIn">
                <input 
                  type="checkbox" 
                  id="terms"
                  required
                  checked={formData.terms}
                  onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                  className="w-4 h-4 rounded mt-0.5 cursor-pointer"
                  style={{ accentColor: theme.primary }}
                />
                <label htmlFor="terms" className={`text-[11px] font-medium leading-normal cursor-pointer select-none ${subtextColor}`}>
                  I authorize platform protocols and consent to the data encryption rules of the PawSpace network.
                </label>
              </div>
            )}

            {/* SUBMIT EXECUTION BUTTON CONTROL VECTOR */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg text-white transition-all transform hover:scale-[1.01] active:scale-95 mt-4"
              style={{ backgroundColor: theme.primary }}
            >
              {isSignUp ? (
                <>
                  <UserPlus className="w-4 h-4" /> INITIALIZE ACCOUNT
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> INTERFACE SIGN IN
                </>
              )}
            </button>
          </form>

          {/* DYNAMIC WORKFLOW ALTERNATOR ANCHOR SWITCHER */}
          <div className="text-center pt-2">
            <p className={`text-xs font-medium ${subtextColor}`}>
              {isSignUp ? 'Already have an initialized configuration?' : "Don't have a profile space yet?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({ name: '', email: '', password: '', terms: false });
                }}
                className="font-black hover:underline ml-1"
                style={{ color: theme.primary }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up Free'}
              </button>
            </p>
          </div>
        </div>

        {/* COMPLIANCE FEED FOOTER */}
        <div className={`text-center text-[10px] font-medium tracking-wide border-t border-dashed pt-4 mt-6 ${subtextColor}`}
             style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
          🔒 End-to-end user state session tokens deployment matrix active.
        </div>
      </div>

    </div>
  );
}