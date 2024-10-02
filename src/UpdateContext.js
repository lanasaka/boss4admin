import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [updates, setUpdates] = useState([]);
  const [unseenFiles, setUnseenFiles] = useState([]);

  const fetchApplicationName = async (applicationId) => {
    if (!applicationId) {
      console.warn('Invalid applicationId:', applicationId);
      return 'Unknown Application';
    }

    try {
      const response = await axios.get(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/applications/${applicationId}`);
      console.log('Fetched application data for ID:', applicationId, response.data);
      return response.data.applicationCode || 'Unknown Application';
    } catch (error) {
      console.error('Error fetching application name:', error);
      return 'Unknown Application';
    }
  };

  const fetchUpdates = async () => {
    try {
      const response = await fetch('https://boss4edu-a37be3e5a8d0.herokuapp.com/api/chats/unread/user');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const userMessages = data.messages.filter(message => message.sender === 'user');

      const updatesWithAppName = await Promise.all(userMessages.map(async (message) => {
        const applicationCode = await fetchApplicationName(message.applicationId);
        return {
          message: message.content || 'No message content',
          messageId: message.id,
          sender: message.sender,
          applicationId: message.applicationId,
          applicationCode,
          read: message.isRead === 1,
        };
      }));

      setUpdates(updatesWithAppName);
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  };

  const fetchUnseenFiles = async () => {
    try {
      const response = await axios.get('https://boss4edu-a37be3e5a8d0.herokuapp.com/extra-files/un-seen');
      console.log('Fetched unseen files:', response.data);

  const filesWithAppCodes = await Promise.all(response.data.map(async (file) => {
  const applicationId = file.application_id; // Double-check that this matches the API response field
  const applicationCode = await fetchApplicationName(applicationId);
  return {
    ...file,
    applicationCode,
    applicationId, // Ensure this is included in the returned object
  };
}));

      setUnseenFiles(filesWithAppCodes);
    } catch (error) {
      console.error('Error fetching unseen files:', error);
    }
  };

  const markUpdateAsRead = async (messageId) => {
    setUpdates(prevUpdates =>
      prevUpdates.map(update =>
        update.messageId === messageId ? { ...update, read: true } : update
      )
    );
    try {
      await axios.put(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/chats/read/${messageId}`);
    } catch (error) {
      console.error('Error marking update as read:', error);
    }
  };

  useEffect(() => {
    fetchUpdates();
    fetchUnseenFiles();
    const intervalId = setInterval(() => {
      fetchUpdates();
      fetchUnseenFiles();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <UpdateContext.Provider value={{ updates, unseenFiles, markUpdateAsRead }}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = () => {
  return useContext(UpdateContext);
};
