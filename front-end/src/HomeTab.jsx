// src/HomeTab.jsx
import React, { useState } from 'react';
import { 
  Image, Megaphone, Gift, BarChart2, Smile, Heart, MessageCircle, 
  Repeat, Bookmark, TrendingUp, HeartHandshake, SlidersHorizontal 
} from 'lucide-react';

// FIX: Consuming theme prop directly passed down from App shell layout
export default function HomeTab({ theme, onNavigate }) {
  const [newPostText, setNewPostText] = useState('');
  const [activeFeedTab, setActiveFeedTab] = useState('forYou');
  const [commentOpenPostId, setCommentOpenPostId] = useState(null);

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
      isLiked: false
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
      isLiked: false
    },
    {
      id: 3,
      author: "Dr. K. Sharma (Vet)",
      handle: "@askthevet",
      time: "6h",
      avatar: "🩺",
      content: "Quick Tip: Hydration is key during hot months! If your feline friend isn't drinking enough from their bowl, try a cat water fountain. They love running water. 💦",
      tags: ["CatCare", "VetTips", "Hydration"],
      hasImage: false,
      likes: 342,
      comments: 89,
      shares: 95,
      isLiked: false
    }
  ]);

  const [suggestedProfiles, setSuggestedProfiles] = useState([
    { id: 'kk', name: "Kitty Kingdom", handle: "@kitty.kingdom", icon: "👑", isFollowing: false },
    { id: 'fff', name: "Furry Friends Club", handle: "@furry.friends", icon: "🐾", isFollowing: false },
    { id: 'mh', name: "Meow House", handle: "@meow.house", icon: "🏡", isFollowing: false }
  ]);

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
      isLiked: false
    };

    setPosts([addedPost, ...posts]);
    setNewPostText('');
  };

  const handleLikeToggle = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleFollowToggle = (id, e) => {
    e.stopPropagation();
    setSuggestedProfiles(suggestedProfiles.map(p => 
      p.id === id ? { ...p, isFollowing: !p.isFollowing } : p
    ));
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 tracking-tight">
      <div className="lg:col-span-2 space-y-6">
        
        {/* Post Composer Card */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: theme.border }}>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="flex gap-3 items-start">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-xl border border-slate-100 shadow-sm cursor-pointer"
                onClick={() => onNavigate?.('profile')}
              >
                🐈
              </div>
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's on your mind, Beau?"
                className="w-full pt-2 bg-transparent border-none outline-none resize-none text-sm font-normal text-slate-700 placeholder:text-slate-400"
                rows="2"
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-between border-t pt-4" style={{ borderColor: theme.border }}>
              <div className="flex gap-5 text-xs font-medium text-slate-500">
                <button type="button" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"><Image className="w-4 h-4 text-slate-400" /> Photo / Video</button>
                <button type="button" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"><Megaphone className="w-4 h-4 text-slate-400" /> Adoption</button>
                <button type="button" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"><Gift className="w-4 h-4 text-slate-400" /> Donation</button>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors"><Smile className="w-4 h-4" /></button>
                <button type="submit" className="px-4 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-98 hover:opacity-95"
                        style={{ backgroundColor: theme.primary, color: theme.background }}>
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Navigation Filters */}
        <div className="flex justify-center items-center border-b pb-1 text-sm font-medium text-slate-500 relative" style={{ borderColor: theme.border }}>
          <div className="flex gap-10 justify-center">
            <span 
              className="pb-2.5 cursor-pointer transition-all duration-200 border-b-2 font-semibold text-center" 
              style={{ 
                borderColor: activeFeedTab === 'forYou' ? theme.primary : 'transparent', 
                color: activeFeedTab === 'forYou' ? theme.primary : 'inherit',
                opacity: activeFeedTab === 'forYou' ? 1 : 0.6
              }}
              onClick={() => setActiveFeedTab('forYou')}
            >
              For You
            </span>
            <span 
              className="pb-2.5 cursor-pointer transition-all duration-200 border-b-2 font-semibold text-center" 
              style={{ 
                borderColor: activeFeedTab === 'following' ? theme.primary : 'transparent', 
                color: activeFeedTab === 'following' ? theme.primary : 'inherit',
                opacity: activeFeedTab === 'following' ? 1 : 0.6
              }}
              onClick={() => setActiveFeedTab('following')}
            >
              Following
            </span>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1 mb-2 absolute right-2"><SlidersHorizontal className="w-4 h-4" /></button>
        </div>

        {/* Main Post Stream Container */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border rounded-2xl p-5 shadow-sm space-y-4" style={{ borderColor: theme.border }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate?.('profile')}>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-lg border border-slate-100">{post.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-sm tracking-tight text-slate-800 hover:underline">{post.author}</h4>
                    <p className="text-[11px] font-normal text-slate-400">{post.handle} • {post.time}</p>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-500 font-medium tracking-widest text-xs">•••</button>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-normal leading-relaxed" style={{ color: theme.text }}>{post.content}</p>
                {post.tags && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {post.hasImage && (
                <div className="rounded-xl h-48 flex items-center justify-center font-normal text-xs tracking-wide border border-dashed text-slate-300 select-none bg-slate-50/30"
                     style={{ borderColor: theme.border }}>
                  {post.imagePlaceholder}
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t text-xs font-medium text-slate-400" style={{ borderColor: theme.border }}>
                <button 
                  className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
                  style={{ color: post.isLiked ? '#ef4444' : 'inherit' }}
                  onClick={() => handleLikeToggle(post.id)}
                >
                  <Heart className="w-4 h-4" fill={post.isLiked ? "currentColor" : "none"} /> {post.likes}
                </button>
                <button 
                  onClick={() => setCommentOpenPostId(commentOpenPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 hover:text-slate-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> {post.comments}
                </button>
                <button className="flex items-center gap-1.5 hover:text-slate-700 transition-colors"><Repeat className="w-4 h-4" /> {post.shares}</button>
                <button className="flex items-center gap-1.5 hover:text-slate-700 transition-colors"><Bookmark className="w-4 h-4" /></button>
              </div>

              {commentOpenPostId === post.id && (
                <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl mt-2">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Comments</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Write a response comment..." 
                      className="w-full text-xs p-2 border border-slate-200 rounded-xl outline-none bg-white focus:border-slate-300 transition-colors font-normal text-slate-600"
                    />
                    <button 
                      type="button" 
                      className="text-[11px] font-semibold px-3 py-1 rounded-xl text-white hover:opacity-95"
                      style={{ backgroundColor: theme.primary }}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Column Sidebar Widgets */}
      <div className="space-y-6">
        <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: theme.border }}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" /> Trending
          </h3>
          <div className="space-y-3.5">
            {[
              { tag: "#AdoptDontShop", posts: "2,345 posts" },
              { tag: "#Caturday", posts: "1,892 posts" },
              { tag: "#RescueCats", posts: "1,256 posts" }
            ].map((item, i) => (
              <div key={i} className="cursor-pointer group" onClick={() => onNavigate?.('explore')}>
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 group-hover:underline">{item.tag}</p>
                <p className="text-[11px] font-normal text-slate-400 mt-0.5">{item.posts}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: theme.border }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Suggested Profiles</h3>
            <button onClick={() => onNavigate?.('explore')} className="text-xs font-medium text-slate-400 hover:text-slate-600 underline decoration-dotted">View all</button>
          </div>
          <div className="space-y-3.5">
            {suggestedProfiles.map((profile) => (
              <div key={profile.id} className="flex items-center justify-between gap-2 cursor-pointer group" onClick={() => onNavigate?.('profile')}>
                <div className="flex items-center gap-2.5">
                  <span className="text-base p-1.5 bg-slate-50 border border-slate-100 rounded-xl">{profile.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-slate-700 group-hover:underline">{profile.name}</p>
                    <p className="text-[10px] font-normal text-slate-400">{profile.handle}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => handleFollowToggle(profile.id, e)}
                  className="px-3 py-1 rounded-lg text-[10px] font-medium border transition-all duration-150 active:scale-95"
                  style={{ 
                    backgroundColor: profile.isFollowing ? '#f8fafc' : 'transparent', 
                    color: profile.isFollowing ? '#94a3b8' : theme.primary, 
                    borderColor: profile.isFollowing ? '#e2e8f0' : theme.primary 
                  }}
                >
                  {profile.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5 shadow-sm border flex flex-col justify-between space-y-4"
             style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-semibold tracking-tight text-slate-800 mb-1">Small act, big impact 💜</h4>
              <p className="text-xs font-normal leading-relaxed text-slate-500">Your donation can feed, heal and shelter cats in need.</p>
            </div>
            <span className="text-xl opacity-70">📦</span>
          </div>
          <button 
            onClick={() => onNavigate?.('donations')}
            className="w-full py-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-99 hover:opacity-95"
            style={{ backgroundColor: theme.primary, color: theme.background }}
          >
            <HeartHandshake className="w-4 h-4" /> Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}