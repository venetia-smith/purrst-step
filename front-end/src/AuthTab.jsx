import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import { supabase } from './lib/supabase';
import { apiFetch } from './lib/api';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Sparkles,
  ShieldCheck,
  Heart,
  PawPrint
} from 'lucide-react';

export default function AuthTab({ currentTheme = 'orange' }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: false
  });

  const theme = catThemes[currentTheme] || catThemes.orange;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSubmitting(true);

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

          setStatusMessage('Account created successfully. Welcome to Purrst Step.');
        } else {
          setStatusMessage('Account created. Please check your email to confirm your account.');
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

        setStatusMessage('Signed in successfully. Opening your dashboard...');
      }
    } catch (err) {
      setStatusMessage(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetMode = () => {
    setIsSignUp(!isSignUp);
    setStatusMessage('');
    setFormData({
      name: '',
      email: '',
      password: '',
      terms: false
    });
  };

  return (
    <div className="min-h-[720px] w-full flex items-center justify-center font-sans tracking-tight">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* LEFT BRAND PANEL */}
        <div
          className="rounded-3xl border shadow-sm overflow-hidden relative p-8 flex flex-col justify-between min-h-[560px]"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border
          }}
        >
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top left, ${theme.primary}20, transparent 35%), radial-gradient(circle at bottom right, ${theme.primary}14, transparent 42%)`
            }}
          />

          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl border flex items-center justify-center text-2xl shadow-sm"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.border
                }}
              >
                🐾
              </div>

              <div>
                <h1 className="text-xl font-semibold tracking-tight" style={{ color: theme.text }}>
                  Purrst Step
                </h1>
                <p className="text-[11px] font-medium" style={{ color: theme.textMuted }}>
                  Cat care, learning, and adoption in one place.
                </p>
              </div>
            </div>

            <div className="space-y-4 max-w-md">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{
                  color: theme.primary,
                  borderColor: theme.border,
                  backgroundColor: `${theme.primary}10`
                }}
              >
                <Sparkles className="w-3 h-3" />
                First step into smarter cat care
              </span>

              <h2
                className="text-3xl font-semibold leading-tight tracking-tight"
                style={{ color: theme.text }}
              >
                Learn, adopt, and care for cats with confidence.
              </h2>

              <p className="text-sm leading-relaxed font-normal" style={{ color: theme.textMuted }}>
                Begin with Mello’s story, unlock bite-sized cat-care lessons,
                explore adoption listings, and track your progress securely.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Secure',
                  desc: 'Protected profiles and progress'
                },
                {
                  icon: Heart,
                  title: 'Caring',
                  desc: 'Adoption and cat-care first'
                },
                {
                  icon: PawPrint,
                  title: 'Playful',
                  desc: 'Story-based learning flow'
                }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border p-4"
                    style={{
                      backgroundColor: theme.background,
                      borderColor: theme.border
                    }}
                  >
                    <Icon className="w-4 h-4 mb-3" style={{ color: theme.primary }} />

                    <p className="text-xs font-medium" style={{ color: theme.text }}>
                      {item.title}
                    </p>

                    <p className="text-[10px] leading-normal mt-1" style={{ color: theme.textMuted }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 pt-8">
            <div
              className="rounded-2xl border p-4 flex items-center gap-3"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.border
              }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl">
                🐱
              </div>

              <div>
                <p className="text-xs font-medium" style={{ color: theme.text }}>
                  Mello is waiting.
                </p>

                <p className="text-[11px]" style={{ color: theme.textMuted }}>
                  Sign in to save your journey and unlock care lessons.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AUTH CARD */}
        <div
          className="rounded-3xl border shadow-sm p-6 sm:p-8 flex items-center"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border
          }}
        >
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div
                className="w-14 h-14 mx-auto rounded-2xl border flex items-center justify-center text-2xl shadow-sm"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.border
                }}
              >
                {isSignUp ? '🐾' : '🐱'}
              </div>

              <div>
                <h2 className="text-2xl font-semibold tracking-tight" style={{ color: theme.text }}>
                  {isSignUp ? 'Create your account' : 'Welcome back'}
                </h2>

                <p className="text-xs font-normal mt-1" style={{ color: theme.textMuted }}>
                  {isSignUp
                    ? 'Start your Purrst Step journey with Mello.'
                    : 'Sign in to continue your saved cat-care journey.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label
                    className="text-xs font-medium flex items-center gap-1.5"
                    style={{ color: theme.text }}
                  >
                    <User className="w-3.5 h-3.5" />
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Darshan"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-normal border outline-none transition-all"
                    style={{
                      backgroundColor: theme.background,
                      borderColor: theme.border,
                      color: theme.text
                    }}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label
                  className="text-xs font-medium flex items-center gap-1.5"
                  style={{ color: theme.text }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-normal border outline-none transition-all"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    color: theme.text
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-xs font-medium flex items-center gap-1.5"
                  style={{ color: theme.text }}
                >
                  <Lock className="w-3.5 h-3.5" />
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl text-xs font-normal border outline-none transition-all"
                    style={{
                      backgroundColor: theme.background,
                      borderColor: theme.border,
                      color: theme.text
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: theme.textMuted }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    className="w-4 h-4 rounded mt-0.5 cursor-pointer"
                    style={{ accentColor: theme.primary }}
                  />

                  <span className="text-[11px] leading-normal" style={{ color: theme.textMuted }}>
                    I agree to use Purrst Step responsibly and understand this is a hackathon demo app.
                  </span>
                </label>
              )}

              {statusMessage && (
                <div
                  className="rounded-xl border px-3.5 py-2.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${theme.primary}10`,
                    borderColor: theme.border,
                    color: theme.text
                  }}
                >
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm text-white transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: theme.primary }}
              >
                {isSubmitting ? (
                  'Please wait...'
                ) : isSignUp ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-1">
              <p className="text-xs font-normal" style={{ color: theme.textMuted }}>
                {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}

                <button
                  type="button"
                  onClick={resetMode}
                  className="font-medium hover:underline ml-1"
                  style={{ color: theme.primary }}
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>

            <div
              className="text-center text-[10px] font-normal tracking-wide border-t border-dashed pt-4"
              style={{
                color: theme.textMuted,
                borderColor: theme.border
              }}
            >
              🔒 Secured with Supabase Auth and protected backend routes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}