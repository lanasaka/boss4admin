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
import { UpdateProvider } from './UpdateContext'; // Import UpdateProvider
import axios from 'axios';

// Function to fetch unseen files where sender is 'user'
const fetchUnseenFiles = async () => {
  try {
    const response = await axios.get('https://boss4edu-a37be3e5a8d0.herokuapp.com/extra-files/un-seen');
    return response.data;
  } catch (error) {
    console.error('Error fetching unseen files:', error);
    return [];
  }
};

// Function to mark a file as seen
const markFileAsSeen = async (fileId) => {
  try {
    await axios.put(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/extra-files/${fileId}/seen`);
  } catch (error) {
    console.error('Error marking file as seen:', error);
  }
};

// Log unseen files before rendering the app
const logUnseenFiles = async () => {
  try {
    const unseenFiles = await fetchUnseenFiles();
    console.log('Unseen Extra Files from User:', unseenFiles);

    // Optionally mark them as seen
    for (const file of unseenFiles) {
      await markFileAsSeen(file.id);
    }
  } catch (error) {
    console.error('Error logging unseen files:', error);
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

// Fetch and log unseen files before rendering the app
logUnseenFiles().then(() => {
  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <NotificationProvider>
        <UpdateProvider> 
          <App />
        </UpdateProvider>
        <ToastContainer />
      </NotificationProvider>
    </Provider>
  );
});
