import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Input, Card, CardBody, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminShowApps = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [applicationTypeFilter, setApplicationTypeFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');

  const applicationTypes = ['new', 'waiting', 'offer', 'payment', 'acceptance', 'rejected', 'complete'];
  const companies = [...new Set(applications.map(app => app.company))]; // Extract unique companies

  const filteredApplications = applications.filter((app) => {
    const matchesSearchTerm = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               app.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesApplicationType = applicationTypeFilter === '' || 
                                   (applicationTypeFilter === 'new' && (app.appType === '' || !app.appType || app.appType === 'new')) ||
                                   app.appType === applicationTypeFilter;

    const matchesCompany = companyFilter === '' || app.company === companyFilter;

    return matchesSearchTerm && matchesApplicationType && matchesCompany;
  });

  const fetchApplications = async () => {
    try {
      const response = await axios.get('https://boss4edu-a37be3e5a8d0.herokuapp.com/api/admin/applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching applications. Please try again later.');
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const deleteApplication = async (id) => {
    try {
      const response = await axios.delete(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/applications/${id}`);
      if (response.status === 200) {
        fetchApplications();
        toast.success('Application deleted successfully');
      } else {
        toast.error('Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Error deleting application. Please try again later.');
    }
  };

  const getButtonConfig = (application) => {
    switch (application.appType) {
      case 'new':
        return { text: 'New Application', color: 'secondary' };
      case 'waiting':
        return { text: 'Waiting for data processing', color: 'warning' };
      case 'offer':
        return { text: 'Initial Acceptance', color: 'primary' };
      case 'payment':
        return { text: 'Waiting for payment', color: 'info' };
      case 'acceptance':
        return { text: 'Final Acceptance', color: 'success' };
      case 'rejected':
        return { text: 'Rejected', color: 'danger' };
      case 'complete':
        return { text: 'Completed', color: 'dark' };
      default:
        return { text: 'New Application', color: 'secondary' };
    }
  };

  return (
    <Container>
      <Card className="mb-4" style={{ borderColor: '#28a745', borderWidth: '2px', borderStyle: 'solid' }}>
        <CardBody>
          <Row className="align-items-center">
            <Col md={6} className="mb-3 mb-md-0">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Name or Email"
                className="w-100"
                style={{ maxWidth: '650px', borderColor: '#28a745' }}
              />
            </Col>
            <Col md={6}>
              <Row form>
                <Col md={6} className="mb-3">
                  <label className="mr-2">Filter by Application Type:</label>
                  <Input
                    type="select"
                    value={applicationTypeFilter}
                    onChange={(e) => setApplicationTypeFilter(e.target.value)}
                    style={{ borderColor: '#28a745' }}
                  >
                    <option value="">All Types</option>
                    <option value="new">New Application</option>
                    <option value="waiting">Waiting for data processing</option>
                    <option value="offer">Initial Acceptance</option>
                    <option value="payment">Waiting for payment</option>
                    <option value="acceptance">Final Acceptance</option>
                    <option value="complete">Completed</option>
                    {applicationTypes.filter(type => type !== 'new' && type !== 'waiting' && type !== 'offer' && type !== 'payment' && type !== 'acceptance' && type !== 'complete').map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col md={6} className="mb-3">
                  <label className="mr-2">Filter by Company:</label>
                  <Input
                    type="select"
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    style={{ borderColor: '#28a745' }}
                  >
                    <option value="">All Companies</option>
                    {companies.map(company => (
                      <option key={company} value={company}>
                        {company}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Table
        striped
    
      >
        <thead style={{ backgroundColor: '#28a745', color: 'white' }}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Nationality</th>
            <th>Email</th>
            <th>Semester</th>
            <th>User Name</th>
            <th>Company</th>
            <th>Application Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app, index) => (
            <tr
              key={app.id}
              style={{
                backgroundColor: index % 2 === 0 ? 'white' : '#e0f8e0', // White and light green rows
                borderBottom: '1px solid transparent', // Remove bottom border
              }}
            >
              <th scope="row">{index + 1}</th>
              <td>{app.name}</td>
              <td>{app.nationality}</td>
              <td>{app.email}</td>
              <td>{app.semester}</td>
              <td>{app.userName}</td>
              <td>{app.company}</td>
              <td>
                <Button color={getButtonConfig(app).color} size="md">{getButtonConfig(app).text}</Button>
              </td>
              <td>
                <Button color="info" size="md" className="mr-2">
                  <Link to={`/apps/${app.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>Details</Link>
                </Button>
                <Button color="danger" size="md" onClick={() => deleteApplication(app.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminShowApps;
