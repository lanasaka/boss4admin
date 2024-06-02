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

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('https://boss4edu-a37be3e5a8d0.herokuapp.com/api/admin/applications');
        const data = await response.json();
        setApplications(data);
        console.log(data); // Log the applications state
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
  
    fetchApplications();
  }, []);
  
  const countStatuses = () => {
  let statusCounts = {
    'new': 0,
    'offer': 0,
    'acceptance': 0,
    'payment': 0,
    'waiting': 0,
    'rejected': 0,
    'complete': 0
  };

  // Iterate over applications and count each type
  applications.forEach((app) => {
    // Check if type is empty or "null", and count as "New"
    if (!app.type || app.type === "null") {
      statusCounts['new']++;
    } else {
      statusCounts[app.type]++;
    }
  });

  return statusCounts;
};

  
  const { new: newCount, offer: offerCount, acceptance: acceptanceCount, payment: paymentCount, waiting: waitingCount, rejected: rejectedCount, complete: completeCount } = countStatuses();

  return (
    <CRow>
      {/* Render status cards */}
      {/* You can customize the colors and styles */}
      <CCol sm="6" lg="3">
        <CCard>
          <CCardHeader>New</CCardHeader>
          <CCardBody>
            <h4>{newCount}</h4>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" lg="3">
        <CCard>
          <CCardHeader>Offer</CCardHeader>
          <CCardBody>
            <h4>{offerCount}</h4>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" lg="3">
        <CCard>
          <CCardHeader>Acceptance</CCardHeader>
          <CCardBody>
            <h4>{acceptanceCount}</h4>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" lg="3">
        <CCard>
          <CCardHeader>Payment</CCardHeader>
          <CCardBody>
            <h4>{paymentCount}</h4>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" lg="3">
        <CCard>
          <CCardHeader>Waiting</CCardHeader>
          <CCardBody>
            <h4>{waitingCount}</h4>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" lg="3">
        <CCard>
          <CCardHeader>Rejected</CCardHeader>
          <CCardBody>
            <h4>{rejectedCount}</h4>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" lg="3">
        <CCard>
          <CCardHeader>Complete</CCardHeader>
          <CCardBody>
            <h4>{completeCount}</h4>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
