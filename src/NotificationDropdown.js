import React from 'react';
import {
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { cilBell } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNotification } from './NotificationContext';
import { Link } from 'react-router-dom';

const NotificationDropdown = ({ isOpen, toggleDropdown }) => {
  const { notifications, markNotificationAsRead } = useNotification();

  const unreadUserNotifications = notifications.filter(
    notif => !notif.read && notif.sender === 'user'
  );

  const notificationCount = unreadUserNotifications.length;

  const handleNotificationClick = (messageId) => {
    markNotificationAsRead(messageId);
    toggleDropdown(); // Optionally close the dropdown when clicking a notification
  };

  return (
    <CDropdown variant="nav-item" show={isOpen} toggle={toggleDropdown}>
      <CDropdownToggle
        placement="bottom-end"
        className="relative flex items-center"
        caret={false}
      >
        {notificationCount > 0 && (
          <span
            style={{
              position: 'absolute',
              right: '-6px',
              top: '-10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px', // Increased width
              height: '24px', // Increased height
              color: '#fff', // White text color for better contrast
              backgroundColor: '#e53e3e', // Red background
              fontSize: '15px', // Increased font size
              fontWeight: 'bold',
              borderRadius: '50%',
              zIndex: 10
            }}
          >
            {notificationCount}
          </span>
        )}
        <CIcon icon={cilBell} size="lg" className="text-gray-700 ml-8" />
      </CDropdownToggle>
      <CDropdownMenu className="dropdown-menu-right">
        <CDropdownHeader>Notifications</CDropdownHeader>
        {unreadUserNotifications.length > 0 ? (
          unreadUserNotifications.map((notif, index) => (
            <Link
              to={`/apps/${notif.applicationId}`} // Navigate to the application page
              key={notif.messageId}
              onClick={() => handleNotificationClick(notif.messageId)}
              style={{ 
                textDecoration: 'none', 
                display: 'block',
                backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0', // Alternating row colors
                color: '#333', // Ensure text color is visible
              }}
            >
              <CDropdownItem
                style={{ padding: '10px 15px', backgroundColor: 'transparent' }} // Transparent background for CDropdownItem
              >
                {notif.message || 'No message content'} in ({notif.applicationName})
              </CDropdownItem>
            </Link>
          ))
        ) : (
          <CDropdownItem>No new notifications</CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default NotificationDropdown;
