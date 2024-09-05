import React from 'react';
import {
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { cilUser, cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppHeaderDropdown = ({ notification }) => {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilUser} size="lg" />
        {notification && <span style={{ color: 'red', marginLeft: '10px' }}>{notification}</span>}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        {notification && (
          <CDropdownItem className="text-warning">
            {notification}
          </CDropdownItem>
        )}
        <CDropdownItem onClick={logOut}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

AppHeaderDropdown.propTypes = {
  notification: PropTypes.string,
};

export default AppHeaderDropdown;
