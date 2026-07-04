// src/HomeTab.jsx
import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import { 
  Image, Megaphone, Gift, BarChart2, Smile, Heart, MessageCircle, 
  Repeat, Bookmark, TrendingUp, UserPlus, HeartHandshake, SlidersHorizontal 
} from 'lucide-react';

export default function HomeTab({ currentTheme = 'orange' }) {
  const theme = catThemes[currentTheme];
  const [newPostText, setNewPostText] = useState('');

  // Mock post list array matching file_000000004514720ba6f685d50e63b0e5.png
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Meera & Whiskers",
      handle: "@meera.cats",
      time: "2h",
      avatar: "🐈",
      content: "Whiskers loves sunny spots and belly rubs ☀️🐱 Adopted 6 months ago and my life has never been better! 💜",
      hasImage: true,
      imagePlaceholder: "🐾 [Sleeping Cat Picture Display Area] 🐾",
      likes: 128,
      comments: 23,
      shares: 12,
      isAdoption: false
    },
    {
      id: 2,
      author: "Paws Shelter",
      handle: "@paws.shelter",
      time: "4h",
      avatar: "🏠",
      content: "Meet Milo! 🐾 2 month old male kitten looking for a loving home. Playful, curious & litter trained. 📍 Bengaluru, Karnataka",
      tags: ["Kitten", "Male", "2 Months", "Vaccinated"],
      hasImage: true,
      imagePlaceholder: "🐱 [Milo's Multi-photo Grid Display Area] 🐱",
      likes: 156,
      comments: 41,
      shares: 28,
      isAdoption: true
    }
  ]);

  // Handle posting a new update locally
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const addedPost = {
      id: Date.now(),
      author: "Cinnamon",
      handle: "@cinnamon.escapes",
      time: "Just now",
      avatar: "🐈",
      content: newPostText,
      likes: 0,
      comments: 0,
      shares: 0,
      isAdoption: false
    };

    setPosts([addedPost, ...posts]);
    setNewPostText('');
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* =========================================================================
          LEFT/CENTER COLUMN: Interactive Social Feed
          ========================================================================= */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* --- Post Composer Card Module --- */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm" style={{ borderColor: theme.border }}>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-xl border shadow-sm">🐈</div>
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's on your mind, Beau?"
                className="w-full pt-2 bg-transparent border-none outline-none resize-none text-sm font-medium placeholder:opacity-50"
                rows="2"
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-between border-t pt-3" style={{ borderColor: theme.border }}>
              <div className="flex gap-4 text-xs font-bold opacity-75">
                <button type="button" className="flex items-center gap-1.5 hover:opacity-100 transition-opacity"><Image className="w-4 h-4 text-blue-500" /> Photo / Video</button>
                <button type="button" className="flex items-center gap-1.5 hover:opacity-100 transition-opacity"><Megaphone className="w-4 h-4 text-emerald-500" /> Adoption Post</button>
                <button type="button" className="flex items-center gap-1.5 hover:opacity-100 transition-opacity"><Gift className="w-4 h-4 text-purple-500" /> Donation</button>
                <button type="button" className="flex items-center gap-1.5 hover:opacity-100 transition-opacity"><BarChart2 className="w-4 h-4 text-amber-500" /> Poll</button>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className="opacity-60 hover:opacity-100 transition-opacity"><Smile className="w-4 h-4" /></button>
                <button type="submit" className="px-4 py-1.5 rounded-xl text-xs font-extrabold shadow-sm transition-transform hover:scale-105"
                        style={{ backgroundColor: theme.primary, color: theme.background }}>
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* --- Feed Sub-Navigation Filter Tabs Row --- */}
        <div className="flex justify-between items-center border-b pb-1 text-sm font-bold" style={{ borderColor: theme.border }}>
          <div className="flex gap-6 px-2">
            <span className="border-b-2 pb-2 cursor-pointer transition-colors" style={{ borderColor: theme.primary, color: theme.primary }}>For You</span>
            <span className="opacity-50 hover:opacity-100 pb-2 cursor-pointer transition-opacity">Following</span>
            <span className="opacity-50 hover:opacity-100 pb-2 cursor-pointer transition-opacity">Adoptions</span>
            <span className="opacity-50 hover:opacity-100 pb-2 cursor-pointer transition-opacity">Donations</span>
            <span className="opacity-50 hover:opacity-100 pb-2 cursor-pointer transition-opacity">Recent</span>
          </div>
          <button className="opacity-60 hover:opacity-100 p-1 mb-2"><SlidersHorizontal className="w-4 h-4" /></button>
        </div>

        {/* --- Main Feed Cards Streaming Mapping --- */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border rounded-2xl p-5 shadow-sm space-y-4" style={{ borderColor: theme.border }}>
              
              {/* Card Meta Row Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg border">{post.avatar}</div>
                  <div>
                    <h4 className="font-black text-sm tracking-tight leading-tight">{post.author}</h4>
                    <p className="text-[11px] font-bold opacity-50">{post.handle} • {post.time}</p>
                  </div>
                </div>
                <button className="opacity-40 hover:opacity-100 font-bold text-lg">•••</button>
              </div>

              {/* Feed Text Context Box */}
              <div className="space-y-3">
                {post.isAdoption && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider" 
                        style={{ backgroundColor: theme.cardBg, color: theme.primary }}>
                    🐾 Adoption Post
                  </span>
                )}
                <p className="text-sm font-medium leading-relaxed" style={{ color: theme.text }}>{post.content}</p>
                
                {/* Meta Attributes Chips Row */}
                {post.tags && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Graphic/Photo Block Container */}
              {post.hasImage && (
                <div className="rounded-xl h-48 flex items-center justify-center font-bold text-xs tracking-wide border border-dashed text-slate-400 select-none bg-slate-50/50"
                     style={{ borderColor: theme.border }}>
                  {post.imagePlaceholder}
                </div>
              )}

              {/* Card Interactive Engagement Action Sliders Bar */}
              <div className="flex justify-between items-center pt-2 border-t text-xs font-bold opacity-60" style={{ borderColor: theme.border }}>
                <button className="flex items-center gap-1.5 hover:text-red-500 hover:opacity-100 transition-colors"><Heart className="w-4 h-4" /> {post.likes}</button>
                <button className="flex items-center gap-1.5 hover:opacity-100 transition-colors"><MessageCircle className="w-4 h-4" /> {post.comments}</button>
                <button className="flex items-center gap-1.5 hover:opacity-100 transition-colors"><Repeat className="w-4 h-4" /> {post.shares}</button>
                <button className="flex items-center gap-1.5 hover:opacity-100 transition-colors"><Bookmark className="w-4 h-4" /></button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* =========================================================================
          RIGHT COLUMN: Sidebar Widgets (Matches file_000000004514720ba6f685d50e63b0e5.png Structure)
          ========================================================================= */}
      <div className="space-y-6">
        
        {/* --- Trending Section Card --- */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: theme.border }}>
          <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: theme.primary }} /> Trending in PawSpace
          </h3>
          <div className="space-y-3.5">
            {[
              { tag: "#AdoptDontShop", posts: "2,345 posts" },
              { tag: "#Caturday", posts: "1,892 posts" },
              { tag: "#RescueCats", posts: "1,256 posts" },
              { tag: "#CatTips", posts: "876 posts" }
            ].map((item, i) => (
              <div key={i} className="cursor-pointer group">
                <p className="text-sm font-bold group-hover:underline" style={{ color: theme.text }}>{item.tag}</p>
                <p className="text-[11px] font-medium opacity-50">{item.posts}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Suggested Groups Module --- */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: theme.border }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black uppercase tracking-wider">Suggested for you</h3>
            <button className="text-xs font-bold opacity-60 hover:opacity-100">View all</button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Kitty Kingdom", handle: "@kitty.kingdom", icon: "👑" },
              { name: "Furry Friends Club", handle: "@furry.friends", icon: "🐾" },
              { name: "Meow House", handle: "@meow.house", icon: "🏡" }
            ].map((group, i) => (
              <div key={i} className="flex items-center justify-between gap-2 p-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg p-1.5 bg-slate-50 border rounded-lg">{group.icon}</span>
                  <div>
                    <p className="text-xs font-bold leading-tight">{group.name}</p>
                    <p className="text-[10px] font-medium opacity-50">{group.handle}</p>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-lg text-[10px] font-extrabold border shadow-sm hover:scale-105 transition-transform"
                        style={{ backgroundColor: theme.cardBg, color: theme.primary, borderColor: theme.border }}>
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- Micro Donation Accent Card --- */}
        <div className="rounded-2xl p-5 shadow-sm border border-dashed flex flex-col justify-between space-y-4"
             style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-black tracking-tight mb-1 flex items-center gap-1">
                Small act, big impact 💜
              </h4>
              <p className="text-xs font-medium leading-relaxed opacity-80">
                Your donation can feed, heal and shelter cats in need.
              </p>
            </div>
            <span className="text-2xl">📦</span>
          </div>
          <button className="w-full py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-[1.01]"
                  style={{ backgroundColor: theme.primary, color: theme.background }}>
            <HeartHandshake className="w-4 h-4" /> Donate Now
          </button>
        </div>

        {/* --- Online Active Realtime Friends list --- */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: theme.border }}>
          <h3 className="text-sm font-black uppercase tracking-wider mb-3">Online Friends</h3>
          <div className="space-y-3">
            {[
              { name: "Aisha", handle: "@aisha.cats", icon: "👩‍💻" },
              { name: "Rohan", handle: "@cat.rohan", icon: "👨‍💻" },
              { name: "Simran", handle: "@simran.meows", icon: "🙋‍♀️" }
            ].map((friend, i) => (
              <div key={i} className="flex items-center justify-between p-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center border text-xs">{friend.icon}</span>
                  <div>
                    <p className="text-xs font-bold leading-tight">{friend.name}</p>
                    <p className="text-[9px] font-medium opacity-40">{friend.handle}</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}