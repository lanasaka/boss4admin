import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useNotification } from 'src/NotificationContext';
import CIcon from '@coreui/icons-react';
import { cilBell, cilEnvelopeOpen, cilMenu } from '@coreui/icons';
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react';
import { AppBreadcrumb } from './index';
import AppHeaderDropdown from './header/AppHeaderDropdown';
import NotificationDropdown from '../NotificationDropdown';
import UpdatesDropdown from '../UpdatesDropdown';

const AppHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { notificationCount } = useNotification();

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1">
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav>

        <CNavItem>
            <CNavLink href="#" ref={dropdownRef}>
              <UpdatesDropdown isOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
            </CNavLink>
          </CNavItem>
          
          <CNavItem>
            <CNavLink href="#" ref={dropdownRef}>
              <NotificationDropdown isOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
            </CNavLink>
          </CNavItem>

        
        </CHeaderNav>

        <CHeaderNav className="ms-6">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
