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