// GlobalNotification.js
import React from 'react';
import { useNotification } from './NotificationContext'; // Adjust the import path if needed

const GlobalNotification = () => {
  const { notification, notificationCount, clearNotification } = useNotification();

  if (notificationCount === 0) return null;

  // Clear notifications after a certain time or when clicked
  React.useEffect(() => {
    const timer = setTimeout(() => clearNotification(), 5000); // Clear after 5 seconds
    return () => clearTimeout(timer);
  }, [clearNotification]);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      borderRadius: '5px',
      zIndex: 9999,
      maxWidth: '300px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      {notification.map((msg, index) => (
        <div key={index} style={{ marginBottom: '5px' }}>
          {msg}
        </div>
      ))}
    </div>
  );
};

export default GlobalNotification;
