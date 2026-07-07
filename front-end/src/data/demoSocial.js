export const demoProfiles = [
  {
    id: 'meera',
    name: 'Meera & Whiskers',
    handle: '@meera.cats',
    avatar: '🐈',
    role: 'Cat Parent',
    location: 'Bengaluru, IN',
    bio: 'Adopted Whiskers six months ago. Sharing small wins, cozy corners, and real rescue-cat life.',
    joined: 'Joined January 2026',
    followers: '1.8k',
    following: '214',
    cat: {
      name: 'Whiskers',
      breed: 'Indie Shorthair',
      age: '2 Years',
      personality: 'Gentle, curious, sunbeam hunter',
      favoriteTreat: 'Chicken flakes',
      quirk: 'Sleeps inside laundry baskets like they are luxury suites.'
    }
  },
  {
    id: 'paws-shelter',
    name: 'Paws Shelter',
    handle: '@paws.shelter',
    avatar: '🏠',
    role: 'Verified Shelter',
    location: 'Bengaluru, IN',
    bio: 'A small rescue network helping kittens and adult cats find safe, loving homes.',
    joined: 'Joined March 2025',
    followers: '5.2k',
    following: '128',
    cat: {
      name: 'Milo',
      breed: 'Indie Rescue Kitten',
      age: '3 Months',
      personality: 'Playful, brave, food-motivated',
      favoriteTreat: 'Warm kitten formula',
      quirk: 'Falls asleep after every toy fight.'
    }
  },
  {
    id: 'dr-sharma',
    name: 'Dr. K. Sharma',
    handle: '@askthevet',
    avatar: '🩺',
    role: 'Veterinary Advisor',
    location: 'Indiranagar, Bengaluru',
    bio: 'Veterinarian sharing beginner-friendly cat health, hydration, food, and vaccination tips.',
    joined: 'Joined August 2024',
    followers: '9.4k',
    following: '86',
    cat: {
      name: 'Clinic Cat Nori',
      breed: 'Black Domestic Shorthair',
      age: '4 Years',
      personality: 'Calm, observant, gentle with kittens',
      favoriteTreat: 'Tuna mousse',
      quirk: 'Inspects every new box at the clinic.'
    }
  },
  {
    id: 'kitty-kingdom',
    name: 'Kitty Kingdom',
    handle: '@kitty.kingdom',
    avatar: '👑',
    role: 'Cat Care Community',
    location: 'Online Community',
    bio: 'Daily cat-care reminders, enrichment ideas, and adoption-first resources for new pet parents.',
    joined: 'Joined May 2025',
    followers: '3.1k',
    following: '302',
    cat: {
      name: 'Pumpkin',
      breed: 'Orange Tabby',
      age: '1 Year',
      personality: 'Chaotic, affectionate, dramatic',
      favoriteTreat: 'Salmon bites',
      quirk: 'Yells at empty food bowls with exactly three kibbles left.'
    }
  }
];

export const demoPosts = [
  {
    id: 'post-1',
    authorId: 'meera',
    time: '2h',
    content:
      'Whiskers found the warmest square of sunlight today and refused to move for almost an hour. Tiny rescue-cat victories feel so special. ☀️🐱',
    tags: ['AdoptDontShop', 'RescueCats'],
    hasImage: true,
    imageUrl: 'front-end\public\assets\feed-whiskers-sunbeam.png',
    imageAlt: 'Original illustration of a rescue cat resting in a sunbeam',
    likes: 128,
    shares: 12,
    comments: [
      { id: 'c1', authorId: 'dr-sharma', text: 'Sunbathing is very normal and comforting for cats. Just keep water nearby during hot afternoons.' },
      { id: 'c2', authorId: 'paws-shelter', text: 'Whiskers looks so settled now. This is why foster updates make our day.' }
    ]
  },
  {
    id: 'post-2',
    authorId: 'paws-shelter',
    time: '4h',
    content:
      'Meet Milo! A 3-month-old male kitten looking for a loving home. Playful, curious, vaccinated, and already learning litter-box habits. 📍 Bengaluru',
    tags: ['Kitten', 'Vaccinated', 'Bengaluru'],
    hasImage: true,
    imageUrl: '/assets/generated/feed-milo-card.svg',
    imageAlt: 'Original adoption card illustration for Milo the kitten',
    likes: 156,
    shares: 28,
    comments: [
      { id: 'c3', authorId: 'meera', text: 'Boosting this. Milo has the sweetest eyes!' },
      { id: 'c4', authorId: 'kitty-kingdom', text: 'Adding this to our adoption spotlight list.' }
    ]
  },
  {
    id: 'post-3',
    authorId: 'dr-sharma',
    time: '6h',
    content:
      "Quick tip: Hydration matters. If your cat ignores the water bowl, try placing bowls in different rooms or using a running-water fountain.",
    tags: ['VetTips', 'Hydration', 'CatCare'],
    hasImage: true,
    imageUrl: '/assets/generated/feed-hydration-tip.svg',
    imageAlt: 'Original cat hydration tip illustration',
    likes: 342,
    shares: 95,
    comments: [
      { id: 'c5', authorId: 'meera', text: 'The fountain trick worked for Whiskers!' },
      { id: 'c6', authorId: 'paws-shelter', text: 'We recommend this to new adopters all the time.' }
    ]
  },
  {
    id: 'post-4',
    authorId: 'kitty-kingdom',
    time: '1d',
    content:
      'New cat parent checklist: safe room, clean litter box, shallow food bowls, hiding spot, scratching post, and patience. Trust takes time. 🐾',
    tags: ['NewCatParent', 'CatCare101'],
    hasImage: true,
    imageUrl: '/assets/generated/feed-safe-room.svg',
    imageAlt: 'Original safe room checklist illustration for new cat parents',
    likes: 211,
    shares: 44,
    comments: [
      { id: 'c7', authorId: 'dr-sharma', text: 'Patience is the most underrated part of adoption.' },
      { id: 'c8', authorId: 'paws-shelter', text: 'Saving this for our adopter handout.' }
    ]
  }
];
export function getProfileById(id) {
  return demoProfiles.find((profile) => profile.id === id) || demoProfiles[0];
}