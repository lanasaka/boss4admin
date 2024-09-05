// service-worker.js
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate service worker immediately
  console.log('Service Worker installed'); // Logging installation
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // Take control of all clients
  console.log('Service Worker activated'); // Logging activation
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

const syncMessages = async () => {
  try {
    const response = await fetch('https://boss4edu-a37be3e5a8d0.herokuapp.com/api/chats/long-poll', {
      method: 'GET',
    });
    const data = await response.json();
    
    if (Array.isArray(data.messages) && data.messages.length > 0) {
      console.info('Sync - New messages:', data.messages);
      self.registration.showNotification('New messages received', {
        body: 'You have new messages in your chat.',
        icon: '/path/to/icon.png', // Ensure this path is correct
        tag: 'new-messages', // Add a tag to manage notifications
      });
    }
  } catch (error) {
    console.error('Sync - Error syncing messages:', error);
  }
};

self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.info('Push event data:', data);

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    tag: data.tag || 'general', // Add a tag to manage notifications
  });
});
