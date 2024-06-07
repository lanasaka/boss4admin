import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import './styles.css'; // Import the CSS file

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    'new': 0,
    'offer': 0,
    'acceptance': 0,
    'payment': 0,
    'waiting': 0,
    'rejected': 0,
    'complete': 0
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('https://boss4edu-a37be3e5a8d0.herokuapp.com/api/admin/applications');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    const countStatuses = () => {
      let counts = {
        'new': 0,
        'offer': 0,
        'acceptance': 0,
        'payment': 0,
        'waiting': 0,
        'rejected': 0,
        'complete': 0
      };

      applications.forEach((app) => {
        const type = app.appType || 'new'; // Assuming appType is the property for application type
        if (counts.hasOwnProperty(type)) {
          counts[type]++;
        } else {
          counts['new']++;
        }
      });

      return counts;
    };

    if (Array.isArray(applications)) {
      const counts = countStatuses();
      setStatusCounts(counts);
    }
  }, [applications]);

  return (
    <CRow>
      {Object.entries(statusCounts).map(([status, count]) => (
        <CCol sm="6" lg="3" key={status}>
          <CCard>
            <CCardHeader>{status.charAt(0).toUpperCase() + status.slice(1)}</CCardHeader>
            <CCardBody>
              <h4>{count}</h4>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  );
};

export default Dashboard;
