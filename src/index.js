import 'react-app-polyfill/stable';
import 'core-js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationProvider } from './NotificationContext'; // Import NotificationProvider

const logUnreadMessages = async () => {
  try {
    const response = await fetch('https://boss4edu-a37be3e5a8d0.herokuapp.com/api/chats/unread/user');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Filter messages where sender is 'user'
    const userMessages = data.messages.filter(message => message.sender === 'user');
    console.log('Unread Messages from Users:', userMessages);
  } catch (error) {
    console.error('Error fetching unread messages:', error);
  }
};

// Register service worker and sync
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);

        // Register background sync
        if ('SyncManager' in window) {
          navigator.serviceWorker.ready.then((swRegistration) => {
            swRegistration.sync.register('sync-messages')
              .catch((error) => {
                console.error('Error registering background sync:', error);
              });
          });
        }
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Fetch and log unread messages before rendering the app
logUnreadMessages().then(() => {
  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <NotificationProvider>
        <App />
        <ToastContainer />
      </NotificationProvider>
    </Provider>
  );
});
