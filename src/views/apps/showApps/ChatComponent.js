import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNotification } from 'src/NotificationContext';

const ChatComponent = ({ applicationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userRole, setUserRole] = useState('admin');
  const [applicationName, setApplicationName] = useState('');
  const { markNotificationAsRead } = useNotification();

  useEffect(() => {
    const getApplicationDetails = async () => {
      try {
        const response = await axios.get(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/applications/${applicationId}`);
        setApplicationName(response.data.name || '');
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };

    getApplicationDetails();
  }, [applicationId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/chats/${applicationId}`);
        if (response.data && Array.isArray(response.data.messages)) {
          const newMessages = response.data.messages;
          setMessages(newMessages);

          // Mark messages as read on the server
          const unreadMessages = newMessages.filter(msg => !msg.read && msg.sender !== userRole);
          await Promise.all(unreadMessages.map(async (msg) => {
            await axios.put(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/chats/read/${msg.id}`);
          }));
        } else {
          console.error('API response is not an array:', response.data);
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    getMessages();

    const pollingInterval = setInterval(getMessages, 5000); // Poll every 5 seconds
    
    return () => clearInterval(pollingInterval); // Clean up on component unmount
  }, [applicationId, userRole]);
  
  const handleSend = async () => {
    if (!newMessage.trim()) return;
  
    const payload = {
      applicationId,  // Only send applicationId, sender, and content
      sender: userRole, // Assuming 'admin' or other role
      content: newMessage,
    };
  
    try {
      const response = await axios.post(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/chats`, payload);
      setMessages([...messages, response.data]);  // Add the new message to the list
      setNewMessage('');  // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      alert('Failed to send message. Please try again later.');
    }
  };
  

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
    
      <div style={{ height: '300px', overflowY: 'auto', borderBottom: '1px solid #ddd', marginBottom: '10px', padding: '10px' }}>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === userRole ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
              <div style={{
                display: 'inline-block',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: msg.sender === userRole ? '#e0f7fa' : '#fff3e0',
                maxWidth: '80%',
              }}>
                {msg.content}
              </div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'No timestamp'}
              </div>
            </div>
          ))
        ) : (
          <div>No messages available</div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginRight: '10px' }}
        />
        <button
          onClick={handleSend}
          style={{ padding: '10px', border: 'none', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

ChatComponent.propTypes = {
  applicationId: PropTypes.string.isRequired,
};

export default ChatComponent;
