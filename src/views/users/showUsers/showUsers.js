import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CRow, CTable, CTableBody, CTableCaption, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const ShowUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(''); // Dropdown filter
  const [companies, setCompanies] = useState([]); // List of companies

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://boss4edu-a37be3e5a8d0.herokuapp.com/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch('https://boss4edu-a37be3e5a8d0.herokuapp.com/api/companies');
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const navigateToAddUser = () => {
    navigate('/users/addUser');
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter((user) =>
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCompany === '' || user.company.toLowerCase() === selectedCompany.toLowerCase())
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedUser),
      });
      if (response.ok) {
        fetchUsers();
        handleCloseModal();
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-start justify-content-center bg-light">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol sm="12" lg="12">
            <CCard className="p-4 shadow">
              <CCardBody>
                <h3 className="text-center mb-4">Users List</h3>

                {/* Search Box and Company Filter */}
                <div className="d-flex justify-content-between mb-3">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control me-2"
                    style={{ flex: '1' }}
                  />
                
                </div>

                <CTable>
                  <CTableCaption>Users</CTableCaption>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Logo</CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Email</CTableHeaderCell>
                      <CTableHeaderCell>Role</CTableHeaderCell>
                      <CTableHeaderCell>Company</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredUsers.map((user, index) => (
                      <CTableRow key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                        <CTableDataCell>
                          <img src={user.logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
                        </CTableDataCell>
                        <CTableDataCell>{user.name}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>{user.role}</CTableDataCell>
                        <CTableDataCell>{user.company}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color="warning" onClick={() => handleEdit(user)}>Edit</CButton>
                          <CButton color="danger" className="ms-2" onClick={() => handleDelete(user.id)}>Delete</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>

                {/* Add User Button */}
                <div className="text-center mt-4">
                  <CButton color="success" onClick={navigateToAddUser}>
                    Add User
                  </CButton>
                </div>

                {/* Edit User Modal */}
                {selectedUser && (
                  <CModal visible={showModal} onClose={handleCloseModal}>
                    <CModalHeader>
                      <CModalTitle>Edit User</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <div>
                        <label>Name</label>
                        <input
                          type="text"
                          value={selectedUser.name}
                          onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                          className="form-control mb-2"
                        />
                      </div>
                      <div>
                        <label>Email</label>
                        <input
                          type="text"
                          value={selectedUser.email}
                          onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                          className="form-control mb-2"
                        />
                      </div>
                      <div>
                        <label>Role</label>
                        <input
                          type="text"
                          value={selectedUser.role}
                          onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                          className="form-control mb-2"
                        />
                      </div>
                      <div>
                        <label>Company</label>
                        <input
                          type="text"
                          value={selectedUser.company}
                          onChange={(e) => setSelectedUser({ ...selectedUser, company: e.target.value })}
                          className="form-control mb-2"
                        />
                      </div>
                      <div>
                        <CButton color="primary" onClick={handleSaveChanges}>
                          Save Changes
                        </CButton>
                        <CButton color="secondary" onClick={handleCloseModal} className="ms-2">
                          Cancel
                        </CButton>
                      </div>
                    </CModalBody>
                  </CModal>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ShowUsers;
