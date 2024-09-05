// src/serviceWorker.js
export function register() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }
  
  // Register the service worker in your index.js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  import { register as registerServiceWorker } from './serviceWorker';
  
  ReactDOM.render(<App />, document.getElementById('root'));
  
  registerServiceWorker();
  