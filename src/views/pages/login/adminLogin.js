import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import logo from '../../../assets/Boss4 Student logo_1.png';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the provided username and password match the admin credentials
    if (username === 'adminBoss4' && password === 'boss4eduadmin123') {
      // Store user data in local storage with dynamic username and role
      const user = { username, role: 'admin' };
      localStorage.setItem('admin', JSON.stringify(user));
      
      // Log the actual username and role to the console
      console.log('Logged in as:', user.username);
      console.log('Role:', user.role);
  
      // Redirect to the dashboard
      navigate('/dashboard');
    } else {
      // Show an error message if credentials are incorrect
      toast.error('Incorrect username or password');
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4" style={{ height: '350px' }}>
                <CCardBody>
                  <CForm>
                    <h1>WELCOME!</h1>
                    <p className="text-medium-emphasis">Log In to your admin account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          className="px-4"
                          onClick={handleLogin}
                          style={{ backgroundColor: '#54af47', border: 'none', outline: 'none' }}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5 d-flex justify-content-center align-items-center"
                style={{ width: '44%', backgroundColor: '#C8FFBC', height: '350px' }}
              >
                <img
                  src={logo}
                  alt="Logo for Boss4 Student"
                  style={{ maxWidth: '140%', maxHeight: '140%', width: 'auto', height: 'auto' }}
                />
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
