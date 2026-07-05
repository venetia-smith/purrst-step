const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// This array keeps track of your "live" notifications in memory
let notifications = [
  { id: 2, type: 'Comments', text: 'commented.', detail: 'Love this cat!', time: '5m ago' },
  { id: 1, type: 'Likes', text: 'liked your post.', detail: 'Sunshine is cute!', time: 'Just now' }
];

// GET endpoint for the feed
app.get('/api/notifications', (req, res) => {
  // Simulate "live" incoming data: 
  // If we have fewer than 6 items, add a new one every time the API is called
  if (notifications.length < 6) {
    const newId = notifications.length + 1;
    const newNotifs = [
      'New toy alert! 🧶',
      'Sunshine is trending! 🌟',
      'Someone followed you! 🐾',
      'Badge earned: Top Collector! 🏆'
    ];
app.get('/api/marketplace', (req, res) => {
  const items = [
    { id: 1, name: "Premium Salmon Kitten Kibble (2kg)", category: "food", price: "₹899", image: "🍗", description: "High-protein formula perfect for growing kittens.", label: "Buy for my cat" },
    { id: 2, name: "Sisal Rope Cat Scratcher Post", category: "toys", price: "₹650", image: "🐾", description: "Durable scratching post to protect your furniture.", label: "Buy for my cat" },
    { id: 3, name: "Shelter Care Package (Litter + Food)", category: "donation", price: "₹1,200", image: "📦", description: "Directly shipped to rescue cats in need at our partner home.", label: "Donate this item" },
    { id: 4, name: "Interactive Feather Wand Toy Trio", category: "toys", price: "₹249", image: "🪄", description: "Engaging stalk-and-pounce toy set for active indoor felines.", label: "Buy for my cat" },
    { id: 5, name: "Pre-loved Cozy Feline Igloo Bed", category: "free", price: "FREE", image: "🎪", description: "Gently used plush bed washed clean, ready for a new home giveaway.", label: "Claim item" },
    { id: 6, name: "Sample Pack: Organic Catnip Flakes", category: "free", price: "FREE", image: "🌿", description: "Complimentary single-use testing pack of premium homegrown catnip.", label: "Claim item" },
  ];
  res.json(items);
});
    
    notifications.unshift({ 
      id: newId, 
      type: 'Likes', 
      text: 'liked your post.', 
      detail: newNotifs[notifications.length % newNotifs.length], 
      time: 'Just now' 
    });
  }
  
  res.json(notifications);
});

// POST endpoint to clear notifications
app.post('/api/notifications/clear', (req, res) => {
  notifications = []; // Resets the array to empty
  res.json({ message: "Notifications cleared successfully" });
});

app.listen(PORT, () => {
  console.log('Server is running perfectly on http://localhost:8080');
});