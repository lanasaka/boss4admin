self.addEventListener('push', function(event) {
    console.log('Push event received:', event);  // Check if this logs
    const data = event.data ? event.data.json() : { title: 'No payload', body: 'Default body' };
    
    const options = {
      body: data.body,
      icon: 'icon.png', // Ensure these paths are correct
      badge: 'badge.png' // Ensure these paths are correct
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
});
