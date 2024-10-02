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
import { useUpdate } from './UpdateContext';
import { Link } from 'react-router-dom';

const UpdatesDropdown = ({ isOpen, toggleDropdown }) => {
  const { updates, unseenFiles, markUpdateAsRead } = useUpdate();

  const unreadUserUpdates = updates.filter((notif) => !notif.read && notif.sender === 'user');
  const notificationCount = unreadUserUpdates.length;
  const unseenFileCount = unseenFiles.length;

  const handleNotificationClick = (messageId) => {
    markUpdateAsRead(messageId);
    toggleDropdown(); // Optionally close the dropdown when clicking a notification
  };

  return (
    <CDropdown variant="nav-item" show={isOpen} toggle={toggleDropdown}>
      <CDropdownToggle
        placement="bottom-end"
        className="relative flex items-center"
        caret={false}
      >
        {(notificationCount > 0 || unseenFileCount > 0) && (
          <span
            style={{
              position: 'absolute',
              right: '-6px',
              top: '-10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              color: '#fff',
              backgroundColor: '#e53e3e',
              fontSize: '15px',
              fontWeight: 'bold',
              borderRadius: '50%',
              zIndex: 10,
            }}
          >
            {notificationCount + unseenFileCount}
          </span>
        )}
        <CIcon icon={cilBell} size="lg" className="text-gray-700 ml-8" />
      </CDropdownToggle>
      <CDropdownMenu className="dropdown-menu-right">
        {unseenFiles.length > 0 && (
          <>
            <CDropdownHeader>Updates</CDropdownHeader>
            {unseenFiles.map((file) => (
              <CDropdownItem key={file.id}>
                <Link
                  to={`/apps/${file.applicationId}`}
                  className="dropdown-item"
                  onClick={() => handleNotificationClick(file.id)}
                >
                  New extra file in ({file.applicationCode || `App ID: ${file.applicationId}` || 'Unknown Application'})
                </Link>
              </CDropdownItem>
            ))}
          </>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default UpdatesDropdown;
