import axios from 'axios';

const POLL_INTERVAL = process.env.REACT_APP_POLL_INTERVAL || 5000;

const checkForNewMessages = async (applicationId, userRole, markNotificationAsRead, applicationName) => {
  try {
    const response = await axios.get(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/chats/${applicationId}`);
    if (response.data && Array.isArray(response.data.messages)) {
      const newMessages = response.data.messages;
      newMessages.forEach(async (msg) => {
        if (!msg.read && msg.sender !== userRole) {
          // No showNotification call here

          try {
            await axios.put(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/chats/read/${msg.id}`);
            markNotificationAsRead(msg.id);
          } catch (error) {
            console.error('Error marking message as read:', error.response ? error.response.data : error.message);
          }
        }
      });
    }
  } catch (error) {
    console.error('Error fetching messages:', error.response ? error.response.data : error.message);
  }
};

export const startPolling = (applicationId, userRole, markNotificationAsRead, applicationName) => {
  return setInterval(() => checkForNewMessages(applicationId, userRole, markNotificationAsRead, applicationName), POLL_INTERVAL);
};
