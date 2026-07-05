// src/AdoptionHomeTab.jsx
import React, { useState } from 'react';
import { 
  Search, Heart, MapPin, ArrowRight, Sparkles, PlusCircle, Gift, ShoppingBag
} from 'lucide-react';

export default function AdoptionHomeTab({ theme, isDarkMode }) {
  const [activeSubTab, setActiveSubTab] = useState('browse'); // 'browse' or 'supplies'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);

  // Expanded feline-exclusive dataset
  // Adoption Dataset with updated image paths
  const adoptionPets = [
    { id: 1, name: "Milo", type: "kitten", breed: "Indie Shorthair", age: "3 Months", gender: "Male", location: "Indiranagar, Bengaluru", image: "/assets/indie.jpg", tag: "Urgent" },
    { id: 2, name: "Luna", type: "kitten", breed: "Indie Stray Mix", age: "5 Months", gender: "Female", location: "Koramangala, Bengaluru", image: "/assets/indie_mix.webp", tag: "Foster Home" },
    { id: 3, name: "Cookie", type: "cat", breed: "Calico Mix", age: "1 Year", gender: "Female", location: "Jayanagar, Bengaluru", image: "/assets/calico_mix.jpg", tag: "Vaccinated" },
    { id: 4, name: "Simba", type: "cat", breed: "Persian Mix", age: "8 Months", gender: "Male", location: "HSR Layout, Bengaluru", image: "/assets/persian_mix.jpg", tag: "Vaccinated" },
    { id: 5, name: "Oliver", type: "cat", breed: "Tabby Mix", age: "2 Years", gender: "Male", location: "Whitefield, Bengaluru", image: "/assets/tabby_mix.webp", tag: "Neutered" },
    { id: 6, name: "Cleo", type: "kitten", breed: "Siamese Cross", age: "4 Months", gender: "Female", location: "Malleshwaram, Bengaluru", image: "/assets/siamese_cross.jpg", tag: "Urgent" },
  ];

  // Marketplace Dataset with verbatim file references
  const catSupplies = [
    { id: 1, name: "Premium Salmon Kitten Kibble (2kg)", category: "food", price: "₹899", image: "/assets/salmon_kibble.jpg", description: "High-protein formula.", label: "Buy for my cat" },
    { id: 2, name: "Sisal Rope Cat Scratcher Post", category: "toys", price: "₹650", image: "/assets/cat_scratcher_post.jpg", description: "Durable scratching post.", label: "Buy for my cat" },
    { id: 3, name: "Shelter Care Package", category: "donation", price: "₹1,200", image: "/assets/care_cat.jpg", description: "Directly shipped to rescues.", label: "Donate this item" },
    { id: 4, name: "Interactive Feather Wand Toy", category: "toys", price: "₹249", image: "/assets/feather_toy.jpg", description: "Engaging stalk-and-pounce toy.", label: "Buy for my cat" },
    { id: 5, name: "Pre-loved Cozy Feline Igloo Bed", category: "free", price: "FREE", image: "/assets/igloo_bed.jpg", description: "Gently used plush bed.", label: "Claim item" },
    { id: 6, name: "Organic Catnip Flakes", category: "free", price: "FREE", image: "/assets/catnip.jpg", description: "Premium homegrown catnip.", label: "Claim item" },
  ];

  const successStories = [
    { id: 1, pet: "Bella (Now Daisy)", owner: "Ananya R.", text: "Adopting Daisy was the best decision of 2025. She transformed from a terrified rescue into the sweetest lap cat!", emoji: "💖" },
    { id: 2, pet: "Chico", owner: "Rahul M.", text: "The team made the process completely clear and supportive. Chico has integrated beautifully with my parents.", emoji: "🏠" }
  ];

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleActionAlert = (actionType) => {
    alert(`Portal Action: Launching setup configuration for "${actionType}".`);
  };

  const filteredPets = adoptionPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pet.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedFilter === 'all' || pet.type === selectedFilter;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 transition-colors duration-300 font-sans">
      
      {/* =========================================================================
          HERO BANNER PROMPT
          ========================================================================= */}
      <div className="rounded-2xl border p-6 shadow-sm relative overflow-hidden transition-all flex flex-col md:flex-row items-center justify-between gap-4"
           style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
        <div className="space-y-2 text-center md:text-left max-w-lg">
          <span title="Find your forever friend" className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit mx-auto md:mx-0 cursor-help"
                style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>
            <Sparkles className="w-3 h-3" /> Find Your Forever Friend
          </span>
          <h2 className="text-lg font-semibold tracking-tight" style={{ color: theme.text }}>
            Give a Second Chance to a Loving Soul
          </h2>
          <p className="text-xs leading-normal opacity-90" style={{ color: theme.textMuted }}>
            All companions listed here are verified through screening, medical profiles, and are actively waiting to join a safe home network.
          </p>
        </div>
        <div title="Cat shelter home" className="text-6xl select-none animate-pulse hidden md:block cursor-default">🏡</div>
      </div>

      {/* =========================================================================
          ACTION HUB ROUTER PILLS
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button 
          onClick={() => { setActiveSubTab('browse'); handleActionAlert('Adoption Matching Registry'); }}
          title="Adopt a cat"
          className="flex items-center gap-3 p-3 text-left rounded-xl border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md hover:border-slate-400 dark:hover:border-slate-600 hover:scale-[1.01] active:scale-99 transition-all group"
          style={{ borderColor: theme.border }}
        >
          <div className="p-2 rounded-lg transition-transform group-hover:scale-110" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}><Heart className="w-4 h-4 fill-current" /></div>
          <div>
            <p className="text-xs font-semibold tracking-tight" style={{ color: theme.text }}>Adopt a Cat</p>
            <p className="text-[10px]" style={{ color: theme.textMuted }}>Browse direct feline rescues</p>
          </div>
        </button>

        <button 
          onClick={() => { setActiveSubTab('supplies'); handleActionAlert('Marketplace Donation Block'); }}
          title="Make a donation"
          className="flex items-center gap-3 p-3 text-left rounded-xl border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-600 hover:scale-[1.01] active:scale-99 transition-all group"
          style={{ borderColor: theme.border }}
        >
          <div className="p-2 rounded-lg text-emerald-500 bg-emerald-500/15 transition-transform group-hover:scale-110"><Gift className="w-4 h-4" /></div>
          <div>
            <p className="text-xs font-semibold tracking-tight" style={{ color: theme.text }}>Make a Donation</p>
            <p className="text-[10px]" style={{ color: theme.textMuted }}>Sponsor physical items & food</p>
          </div>
        </button>

        <button 
          onClick={() => handleActionAlert('Post Re-homing Advertisement')}
          title="Post an ad"
          className="flex items-center gap-3 p-3 text-left rounded-xl border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 hover:scale-[1.01] active:scale-99 transition-all group"
          style={{ borderColor: theme.border }}
        >
          <div className="p-2 rounded-lg text-blue-500 bg-blue-500/15 transition-transform group-hover:scale-110"><PlusCircle className="w-4 h-4" /></div>
          <div>
            <p className="text-xs font-semibold tracking-tight" style={{ color: theme.text }}>Post an Ad</p>
            <p className="text-[10px]" style={{ color: theme.textMuted }}>List for adoption or giveaway</p>
          </div>
        </button>
      </div>

      {/* =========================================================================
          INTERNAL TAB NAVIGATION (Browse Cats vs Cat Supplies)
          ========================================================================= */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 text-xs font-medium">
        <button 
          onClick={() => setActiveSubTab('browse')}
          title="Browse cats"
          className={`px-4 py-2 border-b-2 -mb-px transition-all ${activeSubTab === 'browse' ? 'border-purple-600 text-purple-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          style={{ color: activeSubTab === 'browse' ? theme.primary : undefined, borderBottomColor: activeSubTab === 'browse' ? theme.primary : 'transparent' }}
        >
          🐾 Browse Rescue Cats ({adoptionPets.length})
        </button>
        <button 
          onClick={() => setActiveSubTab('supplies')}
          title="View donations"
          className={`px-4 py-2 border-b-2 -mb-px transition-all ${activeSubTab === 'supplies' ? 'border-purple-600 text-purple-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          style={{ color: activeSubTab === 'supplies' ? theme.primary : undefined, borderBottomColor: activeSubTab === 'supplies' ? theme.primary : 'transparent' }}
        >
          🛍️ Cat Supplies & Marketplace Goods
        </button>
      </div>

      {/* =========================================================================
          SUB-TAB PANEL RENDERING
          ========================================================================= */}
      {activeSubTab === 'browse' ? (
        <>
          {/* CONTROLS BAR (SEARCH & CATEGORY FILTERS) */}
          <div className="space-y-3">
            <div title="Type to search" className="relative rounded-xl shadow-xs flex items-center border overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                 style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
              <Search className="w-4 h-4 ml-3 shrink-0" style={{ color: theme.textMuted }} />
              <input 
                type="text"
                placeholder="Search for cats by name, breed, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2.5 pl-2 text-xs outline-none bg-transparent"
                style={{ color: theme.text }}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              {[
                { id: 'all', label: 'All Felines' },
                { id: 'kitten', label: '🐱 Junior Kittens' },
                { id: 'cat', label: '🐈 Mature Cats' }
              ].map((tab) => {
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    title={`Filter: ${tab.label}`}
                    className="px-4 py-1.5 rounded-xl border font-medium whitespace-nowrap hover:scale-101 active:scale-99 transition-all shadow-3xs"
                    style={{
                      backgroundColor: isActive ? theme.primary : theme.cardBg,
                      borderColor: isActive ? theme.primary : theme.border,
                      color: isActive ? '#ffffff' : theme.text
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* EXPANDED PETS GRID MODULE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => {
                const isFav = favorites.includes(pet.id);
                return (
                  <div 
                    key={pet.id}
                    title={`${pet.name}'s profile card`}
                    className="rounded-2xl border shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
                    style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
                  >
                    <div className="h-32 flex items-center justify-center text-5xl relative select-none bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
                      {/* Fixed: Replaced plain string span with img tag */}
                      <img src={pet.image} alt={pet.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      
                      <span title={`Status: ${pet.tag}`} className="absolute top-2 left-2 text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-3xs border bg-white text-slate-700 border-slate-200">
                        {pet.tag}
                      </span>
                      <button 
                        onClick={() => toggleFavorite(pet.id)}
                        title="Like"
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs border transition-all active:scale-90 hover:bg-white hover:scale-105 shadow-2xs"
                        style={{ borderColor: theme.border }}
                      >
                        <Heart className={`w-3.5 h-3.5 transition-colors ${isFav ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 hover:text-rose-400'}`} />
                      </button>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold tracking-tight text-sm" style={{ color: theme.text }}>{pet.name}</h4>
                          <span title={`Age: ${pet.age}`} className="text-[10px] font-medium px-1.5 py-0.5 rounded-md" 
                                style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}>
                            {pet.age}
                          </span>
                        </div>
                        <p title="Breed and gender" className="text-[11px] font-medium opacity-80" style={{ color: theme.textMuted }}>{pet.breed} • {pet.gender}</p>
                        <p title="Location" className="text-[11px] flex items-center gap-1 opacity-70 pt-1 truncate" style={{ color: theme.textMuted }}>
                          <MapPin className="w-3 h-3 text-rose-400 shrink-0" /> {pet.location}
                        </p>
                      </div>

                      <button 
                        onClick={() => handleActionAlert(`${pet.name}'s Profile Setup`)}
                        title="View profile"
                        className="w-full mt-2 py-1.5 rounded-xl border font-medium text-[11px] transition-all flex items-center justify-center gap-1 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
                        style={{ borderColor: theme.border, color: theme.text }}>
                        View Profile <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div title="No cats found" className="col-span-full text-center py-12 border border-dashed rounded-2xl text-xs max-w-md mx-auto w-full" 
                   style={{ borderColor: theme.border, color: theme.textMuted }}>
                No feline match located. Try shifting or modifying your active search parameters.
              </div>
            )}
          </div>
        </>
      ) : (
        /* =========================================================================
            CAT SUPPLIES MARKETPLACE GRID (Featuring Giveaways)
           ========================================================================= */
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-dashed p-4 rounded-xl"
               style={{ backgroundColor: `${theme.primary}05`, borderColor: theme.border }}>
            <div className="text-xs">
              <h4 className="font-semibold text-sm flex items-center gap-1" style={{ color: theme.text }}>
                <ShoppingBag className="w-4 h-4 text-purple-500" /> Feline Marketplace Hub
              </h4>
              <p style={{ color: theme.textMuted }}>Explore commercial gear, sponsor care packs, or secure useful pre-loved community gear listed as free!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {catSupplies.map((item) => (
              <div 
                key={item.id}
                title={`${item.name} marketplace listing`}
                className="rounded-xl border shadow-xs flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all duration-200"
                style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
              >
                {/* Image Display Box */}
                <div className="h-28 flex items-center justify-center text-4xl bg-slate-100/50 dark:bg-slate-800/50 relative select-none">
                  {/* Fixed: Replaced plain string span with img tag */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  
                  <span className={`absolute top-2 left-2 text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm shadow-3xs ${
                    item.category === 'free' ? 'bg-amber-500 text-white' : item.category === 'donation' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {item.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold tracking-tight truncate max-w-[150px]" style={{ color: theme.text }}>{item.name}</h5>
                      <span className={`font-bold ${item.category === 'free' ? 'text-amber-500 animate-pulse' : 'text-purple-600 dark:text-purple-400'}`}>{item.price}</span>
                    </div>
                    <p className="text-[11px] leading-normal opacity-80 line-clamp-2" style={{ color: theme.textMuted }}>{item.description}</p>
                  </div>

                  {/* Dynamic Action Button Contexts */}
                  <button 
                    onClick={() => handleActionAlert(`Checkout/Claim Process: ${item.name}`)}
                    title={item.category === 'free' ? 'Claim item' : item.category === 'donation' ? 'Make a donation' : 'Buy for my cat'}
                    className={`w-full py-1.5 rounded-lg border font-medium text-[11px] transition-all text-center ${
                      item.category === 'free' ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600' :
                      item.category === 'donation' ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600' : 
                      'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    style={{ borderColor: (item.category === 'donation' || item.category === 'free') ? undefined : theme.border, color: (item.category === 'donation' || item.category === 'free') ? undefined : theme.text }}
                  >
                    {item.label}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMMUNITY SUCCESS STORIES */}
      <div className="rounded-2xl border p-5 shadow-sm space-y-4" 
           style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
        <div>
          <h3 title="Community success chronicles" className="text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5" style={{ color: theme.textMuted }}>
            🎉 Community Success Chronicles
          </h3>
          <p className="text-[11px]" style={{ color: theme.textMuted }}>Real shelter transformations shared straight from our extended family network.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {successStories.map(story => (
            <blockquote 
              key={story.id} 
              title="Success testimonial"
              className="p-4 border rounded-xl relative italic flex flex-col justify-between gap-3 bg-slate-50/20 hover:bg-slate-50/60 dark:hover:bg-slate-800/60 transition-all duration-200 group"
              style={{ borderColor: theme.border }}
            >
              <p className="leading-normal" style={{ color: theme.text }}>
                "{story.text}"
              </p>
              <div className="flex items-center justify-between border-t pt-2 mt-1 not-italic font-semibold text-[11px]"
                   style={{ borderColor: theme.border }}>
                <span style={{ color: theme.primary }}>{story.pet}</span>
                <span className="font-medium" style={{ color: theme.textMuted }}>Adopter: {story.owner}</span>
              </div>
              <span title="Success item emoji" className="absolute -top-2 -right-1 text-xl select-none transition-transform group-hover:rotate-12">{story.emoji}</span>
            </blockquote>
          ))}
        </div>
      </div>

    </div>
  );
}