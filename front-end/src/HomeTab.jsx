import React, { useState } from 'react';
import {
  Image,
  Megaphone,
  Gift,
  Smile,
  Heart,
  MessageCircle,
  Repeat,
  Bookmark,
  TrendingUp,
  HeartHandshake,
  SlidersHorizontal
} from 'lucide-react';
import { demoPosts, demoProfiles, getProfileById } from './data/demoSocial';

export default function HomeTab({ theme, onNavigate, onOpenProfile }) {
  const [newPostText, setNewPostText] = useState('');
  const [activeFeedTab, setActiveFeedTab] = useState('forYou');
  const [commentOpenPostId, setCommentOpenPostId] = useState(null);

  const [posts, setPosts] = useState(
    demoPosts.map((post) => ({
      ...post,
      isLiked: false,
      isSaved: false
    }))
  );

  const [suggestedProfiles, setSuggestedProfiles] = useState(
    demoProfiles
      .filter((profile) => profile.id !== 'meera')
      .slice(0, 3)
      .map((profile) => ({
        ...profile,
        isFollowing: false
      }))
  );

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (!newPostText.trim()) return;

    const addedPost = {
      id: `local-${Date.now()}`,
      authorId: 'meera',
      time: 'Just now',
      content: newPostText,
      tags: ['PurrstStep'],
      hasImage: false,
      imagePlaceholder: '',
      likes: 0,
      shares: 0,
      comments: [],
      isLiked: false,
      isSaved: false
    };

    setPosts([addedPost, ...posts]);
    setNewPostText('');
  };

  const handleLikeToggle = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      })
    );
  };

  const handleSaveToggle = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          isSaved: !post.isSaved
        };
      })
    );
  };

  const handleFollowToggle = (id, e) => {
    e.stopPropagation();

    setSuggestedProfiles(
      suggestedProfiles.map((profile) =>
        profile.id === id
          ? { ...profile, isFollowing: !profile.isFollowing }
          : profile
      )
    );
  };

  const openProfile = (profileId) => {
    if (onOpenProfile) {
      onOpenProfile(profileId);
    } else {
      onNavigate?.('profile');
    }
  };

  const cardStyle = {
    backgroundColor: theme.cardBg,
    borderColor: theme.border,
    color: theme.text
  };

  const softCardStyle = {
    backgroundColor: theme.softBg || theme.background,
    borderColor: theme.border,
    color: theme.text
  };

  const mutedTextStyle = {
    color: theme.textMuted
  };

  const inputStyle = {
    backgroundColor: theme.inputBg || theme.cardBg,
    borderColor: theme.border,
    color: theme.text
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 tracking-tight">
      <div className="lg:col-span-2 space-y-6">
        {/* Post Composer Card */}
        <div
          className="border rounded-2xl p-5 shadow-sm"
          style={cardStyle}
        >
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="flex gap-3 items-start">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl border shadow-sm cursor-pointer"
                style={softCardStyle}
                onClick={() => openProfile(null)}
              >
                🐈
              </div>

              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Share a cat-care update..."
                className="w-full pt-2 bg-transparent border-none outline-none resize-none text-sm font-normal placeholder:text-slate-400"
                style={{ color: theme.text }}
                rows="2"
              />
            </div>

            <div
              className="flex flex-wrap items-center justify-between border-t pt-4"
              style={{ borderColor: theme.border }}
            >
              <div className="flex gap-5 text-xs font-medium" style={mutedTextStyle}>
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                >
                  <Image className="w-4 h-4 text-slate-400" /> Photo / Video
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                  onClick={() => onNavigate?.('adoption')}
                >
                  <Megaphone className="w-4 h-4 text-slate-400" /> Adoption
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                >
                  <Gift className="w-4 h-4 text-slate-400" /> Donation
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Smile className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-98 hover:opacity-95"
                  style={{ backgroundColor: theme.primary, color: theme.background }}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Feed Filters */}
        <div
          className="flex justify-center items-center border-b pb-1 text-sm font-medium relative"
          style={{ borderColor: theme.border, color: theme.textMuted }}
        >
          <div className="flex gap-10 justify-center">
            {[
              { id: 'forYou', label: 'For You' },
              { id: 'following', label: 'Following' }
            ].map((tab) => (
              <span
                key={tab.id}
                className="pb-2.5 cursor-pointer transition-all duration-200 border-b-2 font-semibold text-center"
                style={{
                  borderColor: activeFeedTab === tab.id ? theme.primary : 'transparent',
                  color: activeFeedTab === tab.id ? theme.primary : 'inherit',
                  opacity: activeFeedTab === tab.id ? 1 : 0.6
                }}
                onClick={() => setActiveFeedTab(tab.id)}
              >
                {tab.label}
              </span>
            ))}
          </div>

          <button className="text-slate-400 hover:text-slate-600 p-1 mb-2 absolute right-2">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Main Feed */}
        <div className="space-y-4">
          {posts.map((post) => {
            const author = getProfileById(post.authorId);
            const visibleComments = commentOpenPostId === post.id
              ? post.comments
              : post.comments.slice(0, 2);

            return (
              <div
                key={post.id}
                className="border rounded-2xl p-5 shadow-sm space-y-4"
                style={cardStyle}
              >
                <div className="flex justify-between items-center">
                  <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => openProfile(author.id)}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg border"
                      style={softCardStyle}
                    >
                      {author.avatar}
                    </div>

                    <div>
                      <h4
                        className="font-semibold text-sm tracking-tight group-hover:underline"
                        style={{ color: theme.text }}
                      >
                        {author.name}
                      </h4>
                      <p className="text-[11px] font-normal" style={mutedTextStyle}>
                        {author.handle} • {author.role} • {post.time}
                      </p>
                    </div>
                  </div>

                  <button className="text-slate-300 hover:text-slate-500 font-medium tracking-widest text-xs">
                    •••
                  </button>
                </div>

                <div className="space-y-3">
                  <p
                    className="text-sm font-normal leading-relaxed"
                    style={{ color: theme.text }}
                  >
                    {post.content}
                  </p>

                  {post.tags && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2.5 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: theme.softBg || theme.background,
                            borderColor: theme.border,
                            color: theme.textMuted
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {post.hasImage && (
                  <div
                    className="rounded-2xl overflow-hidden border p-3"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.softBg || theme.background
                    }}
                  >
                    {post.imageUrl ? (
                      <div
                        className="rounded-xl overflow-hidden border"
                        style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
                      >
                        <img
                          src={post.imageUrl}
                          alt={post.imageAlt || 'Original Purrst Step illustration'}
                          className="w-full h-44 object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="h-44 flex items-center justify-center text-xs text-slate-300">
                        {post.imagePlaceholder}
                      </div>
                    )}
                  </div>
                )}

                <div
                  className="flex justify-between items-center pt-3 border-t text-xs font-medium"
                  style={{ borderColor: theme.border, color: theme.textMuted }}
                >
                  <button
                    className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
                    style={{ color: post.isLiked ? '#ef4444' : 'inherit' }}
                    onClick={() => handleLikeToggle(post.id)}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={post.isLiked ? 'currentColor' : 'none'}
                    />
                    {post.likes}
                  </button>

                  <button
                    onClick={() =>
                      setCommentOpenPostId(commentOpenPostId === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1.5 hover:text-slate-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {post.comments.length}
                  </button>

                  <button className="flex items-center gap-1.5 hover:text-slate-700 transition-colors">
                    <Repeat className="w-4 h-4" />
                    {post.shares}
                  </button>

                  <button
                    className="flex items-center gap-1.5 hover:text-slate-700 transition-colors"
                    style={{ color: post.isSaved ? theme.primary : 'inherit' }}
                    onClick={() => handleSaveToggle(post.id)}
                  >
                    <Bookmark
                      className="w-4 h-4"
                      fill={post.isSaved ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                {post.comments.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={mutedTextStyle}>
                      Comments
                    </p>

                    {visibleComments.map((comment) => {
                      const commentAuthor = getProfileById(comment.authorId);

                      return (
                        <div
                          key={comment.id}
                          className="flex gap-2 p-2.5 border rounded-xl"
                          style={softCardStyle}
                        >
                          <button
                            onClick={() => openProfile(commentAuthor.id)}
                            className="w-7 h-7 rounded-full border flex items-center justify-center text-sm shrink-0"
                            style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
                          >
                            {commentAuthor.avatar}
                          </button>

                          <div className="min-w-0">
                            <button
                              onClick={() => openProfile(commentAuthor.id)}
                              className="text-[11px] font-semibold hover:underline"
                              style={{ color: theme.text }}
                            >
                              {commentAuthor.name}
                            </button>

                            <p className="text-[11px] leading-normal" style={mutedTextStyle}>
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {post.comments.length > 2 && (
                      <button
                        onClick={() =>
                          setCommentOpenPostId(commentOpenPostId === post.id ? null : post.id)
                        }
                        className="text-[11px] font-semibold hover:underline"
                        style={{ color: theme.primary }}
                      >
                        {commentOpenPostId === post.id
                          ? 'Show fewer comments'
                          : `View all ${post.comments.length} comments`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        <div
          className="border rounded-2xl p-5 shadow-sm"
          style={cardStyle}
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={mutedTextStyle}>
            <TrendingUp className="w-3.5 h-3.5" /> Trending
          </h3>

          <div className="space-y-3.5">
            {[
              { tag: '#AdoptDontShop', posts: '2,345 posts' },
              { tag: '#Caturday', posts: '1,892 posts' },
              { tag: '#RescueCats', posts: '1,256 posts' }
            ].map((item) => (
              <div key={item.tag} className="cursor-pointer group">
                <p className="text-sm font-medium group-hover:underline" style={{ color: theme.text }}>
                  {item.tag}
                </p>
                <p className="text-[11px] font-normal mt-0.5" style={mutedTextStyle}>
                  {item.posts}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="border rounded-2xl p-5 shadow-sm"
          style={cardStyle}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={mutedTextStyle}>
              Suggested Profiles
            </h3>
          </div>

          <div className="space-y-3.5">
            {suggestedProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between gap-2 cursor-pointer group"
                onClick={() => openProfile(profile.id)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="text-base p-1.5 border rounded-xl"
                    style={softCardStyle}
                  >
                    {profile.avatar}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-medium group-hover:underline truncate" style={{ color: theme.text }}>
                      {profile.name}
                    </p>
                    <p className="text-[10px] font-normal truncate" style={mutedTextStyle}>
                      {profile.handle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => handleFollowToggle(profile.id, e)}
                  className="px-3 py-1 rounded-lg text-[10px] font-medium border transition-all duration-150 active:scale-95 shrink-0"
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

        <div
          className="rounded-2xl p-5 shadow-sm border flex flex-col justify-between space-y-4"
          style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-semibold tracking-tight mb-1" style={{ color: theme.text }}>
                Small act, big impact 💜
              </h4>
              <p className="text-xs font-normal leading-relaxed" style={mutedTextStyle}>
                Your donation can feed, heal and shelter cats in need.
              </p>
            </div>

            <span className="text-xl opacity-70">📦</span>
          </div>

          <button
            onClick={() => onNavigate?.('adoption')}
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