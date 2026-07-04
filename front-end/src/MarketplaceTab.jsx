// src/MarketplaceTab.jsx
import React, { useState } from 'react';
import { catThemes } from './themeStyles';
import { 
  Heart, Gift, PlusCircle, Filter, ArrowRight, MapPin, 
  ChevronDown, ShieldCheck, Users, RefreshCw, HeartHandshake
} from 'lucide-react';

export default function MarketplaceTab({ currentTheme = 'orange' }) {
  const theme = catThemes[currentTheme];

  // Mock Adoptable Cats Data matching left side of file_000000007618720b823ba77bccd8e6b2.png
  const adoptableCats = [
    { id: 1, name: "Milo", gender: "♂", age: "2 months", loc: "Mumbai, MH", bio: "Playful and curious little boy loves to cuddle!", icon: "🐱" },
    { id: 2, name: "Luna", gender: "♀", age: "4 months", loc: "Delhi, DL", bio: "Sweet and gentle princess looking for love 👑", icon: "🐈" },
    { id: 3, name: "Oreo", gender: "♂", age: "1 year", loc: "Bangalore, KA", bio: "Calm and friendly boy. Great with other cats!", icon: "🐼" }
  ];

  // Quick Mini List Rows beneath the main grid
  const miniCatRow = [
    { name: "Coco", gender: "♀", loc: "Pune, MH" },
    { name: "Simba", gender: "♂", loc: "Chennai, TN" },
    { name: "Ginger", gender: "♂", loc: "Kolkata, WB" },
    { name: "Misty", gender: "♀", loc: "Hyderabad, TS" }
  ];

  // Mock Giveaways & Marketplace items matching right side of file_000000007618720b823ba77bccd8e6b2.png
  const marketplaceItems = [
    { id: 1, title: "Cat Tree – Gently Used", desc: "Well maintained cat tree. Perfect for active kitties!", price: "FREE", loc: "Bangalore, KA", poster: "Rhea P.", time: "2 hrs ago" },
    { id: 2, title: "Cat Toys Bundle", desc: "Assorted toys. My cats have outgrown these.", price: "FREE", loc: "Mumbai, MH", poster: "Arjun S.", time: "5 hrs ago" },
    { id: 3, title: "Royal Canin Kitten Food", desc: "2kg pack. Opened but barely used.", price: "₹400", loc: "Pune, MH", poster: "Neha T.", time: "1 day ago" },
    { id: 4, title: "Feeding Bowls", desc: "Stainless steel bowls with stand.", price: "FREE", loc: "Delhi, DL", poster: "Kavya I.", time: "1 day ago" },
    { id: 5, title: "Pet Carrier", desc: "Sturdy carrier. Used only twice.", price: "₹600", loc: "Chennai, TN", poster: "Vikram M.", time: "2 days ago" },
    { id: 6, title: "Cardboard Cat House", desc: "My cat loved this! Hope yours will too 💜", price: "FREE", loc: "Kolkata, WB", poster: "Tania R.", time: "3 days ago" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* =========================================================================
          HERO BANNER MODULE (Matches file_000000007618720b823ba77bccd8e6b2.png)
          ========================================================================= */}
      <div className="rounded-3xl overflow-hidden border p-8 relative flex flex-col md:flex-row justify-between items-center gap-6 bg-white shadow-sm"
           style={{ borderColor: theme.border }}>
        <div className="space-y-4 max-w-xl z-10">
          <h1 className="text-3xl font-black tracking-tight">Adopt. Donate. Give Love. 💜</h1>
          <p className="text-sm font-medium opacity-70 leading-relaxed">
            Help cats and cat lovers by adopting, donating, or giving away items they need.
          </p>
          
          {/* Quick Hub Filter Cards */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border rounded-xl text-xs font-bold shadow-sm hover:scale-[1.02] transition-transform" style={{ borderColor: theme.border }}>
              <Heart className="w-4 h-4 text-purple-500" />
              <div><p className="text-left font-black">Adopt a Cat</p><p className="text-[10px] opacity-50 font-normal">Give a cat a forever home</p></div>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border rounded-xl text-xs font-bold shadow-sm hover:scale-[1.02] transition-transform" style={{ borderColor: theme.border }}>
              <Gift className="w-4 h-4 text-blue-500" />
              <div><p className="text-left font-black">Giveaways & Donations</p><p className="text-[10px] opacity-50 font-normal">Toys, food, accessories & more</p></div>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border rounded-xl text-xs font-bold shadow-sm hover:scale-[1.02] transition-transform" style={{ borderColor: theme.border }}>
              <PlusCircle className="w-4 h-4 text-emerald-500" />
              <div><p className="text-left font-black">Post Ad</p><p className="text-[10px] opacity-50 font-normal">Post for adoption or giveaways</p></div>
            </button>
          </div>
        </div>

        {/* Big Graphic Side Placeholder */}
        <div className="w-64 h-36 border border-dashed rounded-2xl flex items-center justify-center font-bold text-xs text-slate-400 bg-slate-50 select-none" style={{ borderColor: theme.border }}>
          🐾 [Banner Cat Image Feature Area] 🐾
        </div>
      </div>

      {/* =========================================================================
          MAIN DUAL COLUMN CORE CONTENT MARKET GRID
          ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* -----------------------------------------------------------------------
            LEFT SIDE COLUMN: Cat Adoptions (5 / 12 Grid)
            ----------------------------------------------------------------------- */}
        <div className="xl:col-span-5 space-y-4">
          <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: theme.border }}>
            <div className="flex items-center gap-2">
              <span className="text-xl">🐾</span>
              <div>
                <h2 className="text-base font-black tracking-tight">Adoption</h2>
                <p className="text-[11px] font-bold opacity-50">Find your new best friend</p>
              </div>
            </div>
            <button className="text-xs font-bold flex items-center gap-1 transition-colors" style={{ color: theme.primary }}>
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Inline Filter Selectors */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: theme.primary }}>All Cats</span>
            <span className="px-3 py-1.5 rounded-full bg-white border flex items-center gap-1 opacity-70" style={{ borderColor: theme.border }}>Age <ChevronDown className="w-3 h-3" /></span>
            <span className="px-3 py-1.5 rounded-full bg-white border flex items-center gap-1 opacity-70" style={{ borderColor: theme.border }}>Location <ChevronDown className="w-3 h-3" /></span>
            <span className="px-3 py-1.5 rounded-full bg-white border flex items-center gap-1 opacity-70" style={{ borderColor: theme.border }}>Gender <ChevronDown className="w-3 h-3" /></span>
            <span className="ml-auto p-1.5 rounded-xl bg-white border opacity-60" style={{ borderColor: theme.border }}><Filter className="w-3.5 h-3.5" /></span>
          </div>

          {/* Main Triple Stack Adoption Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4">
            {adoptableCats.map((cat) => (
              <div key={cat.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between" style={{ borderColor: theme.border }}>
                <div className="h-32 bg-slate-50 flex items-center justify-center text-4xl border-b select-none relative" style={{ borderColor: theme.border }}>
                  {cat.icon}
                  <span className="absolute bottom-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-black/40 text-white backdrop-blur-sm uppercase tracking-wider">{cat.age}</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-sm flex items-center gap-1">
                      {cat.name} <span className={cat.gender === '♂' ? "text-blue-500" : "text-pink-500"}>{cat.gender}</span>
                    </h3>
                    <span className="text-[10px] font-bold opacity-60 flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {cat.loc}</span>
                  </div>
                  <p className="text-xs font-medium opacity-70 line-clamp-2 leading-relaxed">{cat.bio}</p>
                  
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-1.5 rounded-xl text-xs font-bold text-center border shadow-sm transition-transform hover:scale-[1.02]"
                            style={{ backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.primary }}>
                      View Details
                    </button>
                    <button className="p-1.5 rounded-xl border opacity-60 hover:opacity-100" style={{ borderColor: theme.border }}><Heart className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Miniature Bottom Row mapping */}
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-2 pt-1">
            {miniCatRow.map((mCat, idx) => (
              <div key={idx} className="bg-white border p-2.5 rounded-xl flex items-center gap-2.5 shadow-sm" style={{ borderColor: theme.border }}>
                <span className="text-xl bg-slate-50 p-1 rounded-md border">🐱</span>
                <div className="overflow-hidden">
                  <p className="text-xs font-black truncate flex items-center gap-0.5">{mCat.name} <span className="text-[10px] opacity-40">{mCat.gender}</span></p>
                  <p className="text-[9px] font-bold opacity-40 truncate">{mCat.loc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Adoptable Button Block */}
          <button className="w-full py-2.5 border rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 bg-white shadow-sm hover:scale-[1.01] transition-transform" style={{ borderColor: theme.border }}>
            View All Adoptable Cats <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* -----------------------------------------------------------------------
            RIGHT SIDE COLUMN: Giveaways & Donations Marketplace (7 / 12 Grid)
            ----------------------------------------------------------------------- */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: theme.border }}>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <div>
                <h2 className="text-base font-black tracking-tight">Giveaways & Donations</h2>
                <p className="text-[11px] font-bold opacity-50">Give items or share what you no longer need</p>
              </div>
            </div>
            <button className="text-xs font-bold flex items-center gap-1 transition-colors" style={{ color: theme.primary }}>
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Filter Chips Bar */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: theme.primary }}>All Items</span>
            <span className="px-3 py-1.5 rounded-full bg-white border opacity-70" style={{ borderColor: theme.border }}>Free</span>
            <span className="px-3 py-1.5 rounded-full bg-white border opacity-70" style={{ borderColor: theme.border }}>For Sale</span>
            <span className="px-3 py-1.5 rounded-full bg-white border opacity-70" style={{ borderColor: theme.border }}>Toys</span>
            <span className="px-3 py-1.5 rounded-full bg-white border opacity-70" style={{ borderColor: theme.border }}>Food</span>
            <span className="px-3 py-1.5 rounded-full bg-white border opacity-70" style={{ borderColor: theme.border }}>Accessories</span>
            <span className="px-3 py-1.5 rounded-full bg-white border opacity-70" style={{ borderColor: theme.border }}>Other</span>
            <span className="ml-auto p-1.5 rounded-xl bg-white border opacity-60" style={{ borderColor: theme.border }}><Filter className="w-3.5 h-3.5" /></span>
          </div>

          {/* Main 2-Column Marketplace Item Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {marketplaceItems.map((item) => (
              <div key={item.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between" style={{ borderColor: theme.border }}>
                <div className="h-28 bg-slate-50 flex items-center justify-center text-2xl border-b select-none relative font-bold text-slate-400" style={{ borderColor: theme.border }}>
                  📦
                  <span className={`absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm border ${
                    item.price === 'FREE' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-purple-50 text-purple-600 border-purple-200'
                  }`}>
                    {item.price}
                  </span>
                </div>
                
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-sm tracking-tight line-clamp-1">{item.title}</h3>
                    <p className="text-xs font-medium opacity-60 line-clamp-2 leading-relaxed pt-0.5">{item.desc}</p>
                    <p className="text-[10px] font-bold opacity-40 flex items-center gap-0.5 pt-1.5"><MapPin className="w-3 h-3" /> {item.loc}</p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t mt-2 text-[10px] font-bold opacity-60" style={{ borderColor: theme.border }}>
                    <p>{item.poster} • <span className="font-normal opacity-70">{item.time}</span></p>
                    <button className="opacity-50 hover:opacity-100"><Heart className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row View All Items Trigger */}
          <button className="w-full py-2.5 border rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 bg-white shadow-sm hover:scale-[1.01] transition-transform" style={{ borderColor: theme.border }}>
            View All Items <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* =========================================================================
          BOTTOM VALUE PROP INFO BANNERS BLOCK
          ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t" style={{ borderColor: theme.border }}>
        {[
          { icon: ShieldCheck, title: "Safe & Trusted", desc: "All ads are reviewed to ensure safety and authenticity." },
          { icon: Users, title: "Community First", desc: "Connecting cat lovers to create a better world for cats." },
          { icon: RefreshCw, title: "Reuse & Reduce", desc: "Give items a second life and help a cat in need." },
          { icon: HeartHandshake, title: "Every Act Counts", desc: "Big or small, every act of kindness makes a difference." }
        ].map((prop, idx) => {
          const Icon = prop.icon;
          return (
            <div key={idx} className="flex gap-2.5 p-2 items-start">
              <span className="p-2 bg-white rounded-xl border shadow-sm" style={{ borderColor: theme.border, color: theme.primary }}>
                <Icon className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-black tracking-tight leading-tight mb-0.5">{prop.title}</h4>
                <p className="text-[10px] font-medium opacity-50 leading-normal">{prop.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}