import React, { useState } from 'react';
import {
  Edit3,
  MapPin,
  Calendar,
  Heart,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  Bookmark,
  PawPrint,
  Save,
  ArrowLeft,
  BadgeCheck
} from 'lucide-react';
import { getProfileById } from './data/demoSocial';

export default function ProfileTab({
  theme,
  isDarkMode,
  selectedProfileId = null,
  onBackToOwnProfile
}) {
  const isViewingDemoProfile = Boolean(selectedProfileId);
  const selectedDemoProfile = selectedProfileId ? getProfileById(selectedProfileId) : null;

  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Cinnamon Escapes',
    handle: 'cinnamon_escapes',
    bio: 'Documenting the life, naps, and intermediate hunting operations of a household tiger.',
    location: 'Bengaluru, IN',
    joined: 'Joined July 2026',
    followers: '1.2k',
    following: '180',
    avatar: '🐱',
    role: 'Cat Parent'
  });

  const [catDetails, setCatDetails] = useState({
    name: 'Cinnamon',
    breed: 'Ginger Tabby',
    age: '1 Year',
    personality: 'Playful, Escape Artist, Sunshine Worshipper',
    favoriteTreat: 'Salmon Pate & Crunchy Bites',
    quirk: "Meows at closed doors even if he doesn't want to go inside."
  });

  const [editProfileForm, setEditProfileForm] = useState({ ...profileData });
  const [editCatForm, setEditCatForm] = useState({ ...catDetails });

  const currentProfile = isViewingDemoProfile
    ? {
        name: selectedDemoProfile.name,
        handle: selectedDemoProfile.handle.replace('@', ''),
        bio: selectedDemoProfile.bio,
        location: selectedDemoProfile.location,
        joined: selectedDemoProfile.joined,
        followers: selectedDemoProfile.followers,
        following: selectedDemoProfile.following,
        avatar: selectedDemoProfile.avatar,
        role: selectedDemoProfile.role
      }
    : profileData;

  const currentCat = isViewingDemoProfile ? selectedDemoProfile.cat : catDetails;

  const profilePosts = isViewingDemoProfile
    ? [
        {
          id: 1,
          image: selectedDemoProfile.avatar,
          title: `${selectedDemoProfile.name}'s Cat Care Update`,
          text: `${selectedDemoProfile.bio}`,
          tags: '#PurrstStep #CatCare',
          likes: 128,
          comments: 18
        },
        {
          id: 2,
          image: '🐾',
          title: `${currentCat.name}'s Favorite Moment`,
          text: `${currentCat.name} is known for being ${currentCat.personality.toLowerCase()}.`,
          tags: '#RescueCats #DailyPaws',
          likes: 245,
          comments: 37
        },
        {
          id: 3,
          image: '🏡',
          title: 'Safe Space Setup',
          text: `A calm safe space makes a huge difference for cats like ${currentCat.name}.`,
          tags: '#NewCatParent #SafeRoom',
          likes: 186,
          comments: 22
        }
      ]
    : [
        {
          id: 1,
          image: '🐾',
          title: 'Laundry Basket Caper',
          text: 'Plotting my next escape attempt from the laundry basket.',
          tags: '#cardboardbox #escape',
          likes: 142,
          comments: 28
        },
        {
          id: 2,
          image: '☀️',
          title: 'Sunbeam Rituals',
          text: 'Found a perfect square patch of sunlight on the rug.',
          tags: '#sunbath #chill',
          likes: 320,
          comments: 45
        },
        {
          id: 3,
          image: '🧶',
          title: 'Yarn Catastrophe',
          text: 'The red string had it coming. Complete deniability maintained.',
          tags: '#playtime #chaos',
          likes: 98,
          comments: 12
        },
        {
          id: 4,
          image: '🐟',
          title: 'Gourmet Tasting',
          text: 'Salmon pate hit different this afternoon. Highly recommended.',
          tags: '#foodie #treats',
          likes: 512,
          comments: 89
        },
        {
          id: 5,
          image: '📦',
          title: 'If It Fits...',
          text: 'A fresh parcel arrived. The contents are irrelevant; the box is mine.',
          tags: '#boxlife #cozy',
          likes: 421,
          comments: 64
        },
        {
          id: 6,
          image: '🐦',
          title: 'Window Watch',
          text: 'Chirping intensely at local pigeons. Communication breakdown.',
          tags: '#birdwatching',
          likes: 211,
          comments: 31
        }
      ];

  const handleOpenEdit = () => {
    setEditProfileForm({ ...profileData });
    setEditCatForm({ ...catDetails });
    setIsEditing(true);
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    setProfileData({ ...editProfileForm });
    setCatDetails({ ...editCatForm });
    setIsEditing(false);
  };

  const handleNextPost = (e) => {
    e.stopPropagation();
    if (selectedPostIndex < profilePosts.length - 1) {
      setSelectedPostIndex(selectedPostIndex + 1);
    }
  };

  const handlePrevPost = (e) => {
    e.stopPropagation();
    if (selectedPostIndex > 0) {
      setSelectedPostIndex(selectedPostIndex - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 transition-colors duration-300">
      {isViewingDemoProfile && (
        <button
          onClick={onBackToOwnProfile}
          className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl border bg-white hover:bg-slate-50 transition-all"
          style={{ borderColor: theme.border, color: theme.text }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to my profile
        </button>
      )}

      <div
        className="rounded-2xl border shadow-sm transition-all overflow-hidden"
        style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
      >
        {!isEditing || isViewingDemoProfile ? (
          <div className="p-5 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div
                className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl shadow-sm shrink-0"
                style={{ backgroundColor: theme.background, borderColor: theme.border }}
              >
                {currentProfile.avatar}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-lg font-semibold tracking-tight" style={{ color: theme.text }}>
                    {currentProfile.name}
                  </h1>

                  {isViewingDemoProfile && (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border"
                      style={{ color: theme.primary, borderColor: theme.border }}
                    >
                      <BadgeCheck className="w-3 h-3" />
                      {currentProfile.role}
                    </span>
                  )}

                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                  >
                    @{currentProfile.handle}
                  </span>
                </div>

                <p className="text-xs max-w-md leading-normal opacity-90" style={{ color: theme.textMuted }}>
                  {currentProfile.bio}
                </p>

                <div
                  className="flex flex-wrap justify-center sm:justify-start gap-4 text-[11px] pt-1"
                  style={{ color: theme.textMuted }}
                >
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {currentProfile.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {currentProfile.joined}
                  </span>
                </div>
              </div>
            </div>

            {!isViewingDemoProfile && (
              <button
                onClick={handleOpenEdit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border shadow-sm transition-all active:scale-98 hover:opacity-90"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  color: theme.text
                }}
              >
                <Edit3 className="w-3 h-3" />
                Edit Profile
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSaveAll} className="p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-2 mb-2" style={{ borderColor: theme.border }}>
              <h3 className="font-semibold text-sm tracking-tight flex items-center gap-1.5" style={{ color: theme.text }}>
                🛠️ Edit Profile
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-2.5 py-1 rounded-lg border font-medium hover:bg-slate-50 active:scale-95 transition-all"
                  style={{ borderColor: theme.border, color: theme.textMuted }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg font-semibold text-white flex items-center gap-1 hover:opacity-95 active:scale-95 transition-all shadow-xs"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Save className="w-3 h-3" />
                  Save Changes
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-medium mb-1" style={{ color: theme.textMuted }}>
                  Display Name
                </label>
                <input
                  type="text"
                  value={editProfileForm.name}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
                  className="w-full p-2 border rounded-xl outline-none"
                  style={{ backgroundColor: theme.background, borderColor: theme.border, color: theme.text }}
                />
              </div>

              <div>
                <label className="block font-medium mb-1" style={{ color: theme.textMuted }}>
                  Handle Username
                </label>
                <input
                  type="text"
                  value={editProfileForm.handle}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, handle: e.target.value })}
                  className="w-full p-2 border rounded-xl outline-none"
                  style={{ backgroundColor: theme.background, borderColor: theme.border, color: theme.text }}
                />
              </div>

              <div>
                <label className="block font-medium mb-1" style={{ color: theme.textMuted }}>
                  Location
                </label>
                <input
                  type="text"
                  value={editProfileForm.location}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, location: e.target.value })}
                  className="w-full p-2 border rounded-xl outline-none"
                  style={{ backgroundColor: theme.background, borderColor: theme.border, color: theme.text }}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1" style={{ color: theme.textMuted }}>
                Bio
              </label>
              <textarea
                value={editProfileForm.bio}
                onChange={(e) => setEditProfileForm({ ...editProfileForm, bio: e.target.value })}
                rows="2"
                className="w-full p-2 border rounded-xl outline-none resize-none"
                style={{ backgroundColor: theme.background, borderColor: theme.border, color: theme.text }}
              />
            </div>

            <div className="pt-2 border-t" style={{ borderColor: theme.border }}>
              <p className="font-semibold mb-2" style={{ color: theme.text }}>
                🐾 Feline Companion
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium mb-1" style={{ color: theme.textMuted }}>
                    Cat Name
                  </label>
                  <input
                    type="text"
                    value={editCatForm.name}
                    onChange={(e) => setEditCatForm({ ...editCatForm, name: e.target.value })}
                    className="w-full p-2 border rounded-xl outline-none"
                    style={{ backgroundColor: theme.background, borderColor: theme.border, color: theme.text }}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1" style={{ color: theme.textMuted }}>
                    Breed
                  </label>
                  <input
                    type="text"
                    value={editCatForm.breed}
                    onChange={(e) => setEditCatForm({ ...editCatForm, breed: e.target.value })}
                    className="w-full p-2 border rounded-xl outline-none"
                    style={{ backgroundColor: theme.background, borderColor: theme.border, color: theme.text }}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1" style={{ color: theme.textMuted }}>
                    Age
                  </label>
                  <input
                    type="text"
                    value={editCatForm.age}
                    onChange={(e) => setEditCatForm({ ...editCatForm, age: e.target.value })}
                    className="w-full p-2 border rounded-xl outline-none"
                    style={{ backgroundColor: theme.background, borderColor: theme.border, color: theme.text }}
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        <div
          className="grid grid-cols-3 border-t text-center py-2 text-xs"
          style={{ backgroundColor: `${theme.background}30`, borderColor: theme.border }}
        >
          <div>
            <span className="font-semibold" style={{ color: theme.text }}>
              {profilePosts.length}
            </span>
            <span className="ml-1 font-normal" style={{ color: theme.textMuted }}>
              Posts
            </span>
          </div>

          <div className="border-x" style={{ borderColor: theme.border }}>
            <span className="font-semibold" style={{ color: theme.text }}>
              {currentProfile.followers}
            </span>
            <span className="ml-1 font-normal" style={{ color: theme.textMuted }}>
              Followers
            </span>
          </div>

          <div>
            <span className="font-semibold" style={{ color: theme.text }}>
              {currentProfile.following}
            </span>
            <span className="ml-1 font-normal" style={{ color: theme.textMuted }}>
              Following
            </span>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl border p-5 shadow-sm transition-all"
        style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
      >
        <h3
          className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-1.5"
          style={{ color: theme.textMuted }}
        >
          <PawPrint className="w-3.5 h-3.5" style={{ color: theme.primary }} />
          {isViewingDemoProfile ? 'Featured Feline Companion' : 'Meet My Feline Companion'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          <div
            className="rounded-xl p-4 border flex flex-col items-center justify-center text-center shadow-inner space-y-2 h-full bg-slate-50/40"
            style={{ borderColor: theme.border, backgroundColor: `${theme.background}20` }}
          >
            <span className="text-5xl">{isViewingDemoProfile ? selectedDemoProfile.avatar : '🐈'}</span>

            <div>
              <h4 className="text-base font-bold tracking-tight" style={{ color: theme.text }}>
                {currentCat.name}
              </h4>
              <p className="text-[11px] font-medium" style={{ color: theme.primary }}>
                {currentCat.breed}
              </p>
            </div>

            <span
              className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-white border tracking-wide shadow-2xs"
              style={{ color: theme.textMuted, borderColor: theme.border }}
            >
              Age: {currentCat.age}
            </span>
          </div>

          <div className="md:col-span-2 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 border rounded-xl" style={{ borderColor: theme.border, backgroundColor: theme.background + '10' }}>
                <p className="font-semibold uppercase tracking-wider text-[9px] mb-1" style={{ color: theme.textMuted }}>
                  Personality Traits
                </p>
                <p className="font-medium" style={{ color: theme.text }}>
                  {currentCat.personality}
                </p>
              </div>

              <div className="p-3 border rounded-xl" style={{ borderColor: theme.border, backgroundColor: theme.background + '10' }}>
                <p className="font-semibold uppercase tracking-wider text-[9px] mb-1" style={{ color: theme.textMuted }}>
                  Favorite Treat
                </p>
                <p className="font-medium" style={{ color: theme.text }}>
                  {currentCat.favoriteTreat}
                </p>
              </div>
            </div>

            <div className="p-3 border rounded-xl w-full" style={{ borderColor: theme.border, backgroundColor: theme.background + '10' }}>
              <p className="font-semibold uppercase tracking-wider text-[9px] mb-1" style={{ color: theme.textMuted }}>
                Distinctive Quirk
              </p>
              <p className="font-normal leading-relaxed italic" style={{ color: theme.text }}>
                "{currentCat.quirk}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center border-b pt-2" style={{ borderColor: theme.border }}>
        <div className="flex gap-8 text-xs font-medium uppercase tracking-wider">
          {[
            { id: 'posts', label: 'Posts', icon: Grid },
            { id: 'liked', label: 'Liked', icon: Heart },
            { id: 'saved', label: 'Saved', icon: Bookmark }
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 pb-2.5 border-b-2 transition-all relative top-[1px]"
                style={{
                  borderColor: isTabActive ? theme.primary : 'transparent',
                  color: isTabActive ? theme.text : theme.textMuted
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: isTabActive ? theme.primary : 'inherit' }} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'posts' ? (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {profilePosts.map((post, index) => (
            <div
              key={post.id}
              onClick={() => setSelectedPostIndex(index)}
              className="aspect-square rounded-xl border cursor-pointer relative group overflow-hidden flex items-center justify-center transition-all duration-300 hover:shadow-md"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
            >
              <div className="text-4xl transform group-hover:scale-105 transition-transform duration-300 select-none">
                {post.image}
              </div>

              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 text-white font-medium text-xs">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  {post.comments}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12 border border-dashed rounded-2xl text-xs max-w-md mx-auto"
          style={{ borderColor: theme.border, color: theme.textMuted }}
        >
          No records discovered. Your interaction history under "{activeTab}" will update here.
        </div>
      )}

      {selectedPostIndex !== null && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPostIndex(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={() => setSelectedPostIndex(null)}
          >
            <X className="w-5 h-5" />
          </button>

          <button
            disabled={selectedPostIndex === 0}
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 hidden sm:block"
            onClick={handlePrevPost}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="w-full max-w-md rounded-2xl overflow-hidden border shadow-2xl p-5 flex flex-col gap-4"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: theme.border }}>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full border flex items-center justify-center text-xs"
                  style={{ backgroundColor: theme.background, borderColor: theme.border }}
                >
                  {currentProfile.avatar}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: theme.text }}>
                    {currentProfile.name}
                  </p>
                  <p className="text-[10px]" style={{ color: theme.textMuted }}>
                    {profilePosts[selectedPostIndex].title}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-36 rounded-xl flex items-center justify-center text-5xl select-none" style={{ backgroundColor: theme.background }}>
              {profilePosts[selectedPostIndex].image}
            </div>

            <div className="space-y-3">
              <p className="text-xs leading-relaxed" style={{ color: theme.text }}>
                {profilePosts[selectedPostIndex].text}
              </p>
              <p className="text-[11px] font-medium" style={{ color: theme.primary }}>
                {profilePosts[selectedPostIndex].tags}
              </p>

              <div className="flex items-center justify-between border-t pt-3 text-[11px]" style={{ borderColor: theme.border, color: theme.textMuted }}>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {profilePosts[selectedPostIndex].likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {profilePosts[selectedPostIndex].comments}
                  </span>
                </div>
                <span className="text-[9px] opacity-60">JULY 2026</span>
              </div>
            </div>
          </div>

          <button
            disabled={selectedPostIndex === profilePosts.length - 1}
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 hidden sm:block"
            onClick={handleNextPost}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}