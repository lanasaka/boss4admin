import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationDetails = () => {
  const { appId } = useParams();
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Name, setName] = useState('');
const [PassportNumber, setPassportNumber] = useState('');

// State to hold selected application type
const [selectedType, setSelectedType] = useState('');

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationality, setNationality] = useState('');
  
  const [countryResidence, setCountryResidence] = useState('');
  const [academicDegree, setAcademicDegree] = useState('');
  const [universities, setUniversities] = useState([]);
  const [type, setType] = useState([]);
  const [semester, setSemester] = useState([]);
  const [extraFileName, setExtraFileName] = useState('');

  const [programs, setPrograms] = useState([]);
  const [passportPhoto, setPassportPhoto] = useState(null);

  const [offerLetter, setOfferLetter] = useState(null);
  const [acceptanceLetter, setAcceptanceLetter] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [offerLetterName, setOfferLetterName] = useState('');
  const [acceptanceLetterName, setAcceptanceLetterName] = useState('');
  const [receiptName, setReceiptName] = useState('');
  const [isOfferLetterUploaded, setIsOfferLetterUploaded] = useState(false);
  const [isAcceptanceLetterUploaded, setIsAcceptanceLetterUploaded] = useState(false);
  const [isReceiptUploaded, setIsReceiptUploaded] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    passportNumber: '',
    email: '',
    phoneNumber: '',
    nationality: '',
    countryResidence: '',
    type: '',
    academicDegree: '',
    semester: '',
    university: '',
    program: '',
    passportPhoto: null,
    personalPhoto: null,
    highSchoolCertificate: null,
    highSchoolCertificateEnglish: null,
    highSchoolTranscript: null,
    highSchoolTranscriptEnglish: null,
    extraFile: null,
    extraFileName: '',
    offerLetter: null,
    acceptanceLetter: null,
    receipt: null
  });

 useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/applications/${appId}`);
        const data = await response.json();
        setApplication(data);
        setSelectedType(data.appType || ''); // Set the initial selected type
        setName(data.name || '');
        setPassportNumber(data.passportNumber || '');
        setEmail(data.email || ''); 
        setPhoneNumber(data.phoneNumber || ''); 
        setNationality(data.nationality || ''); 
        setCountryResidence(data.countryResidence || ''); 
        setType(data.type || '');
        setAcademicDegree(data.academicDegree || '');
        setSemester(data.semester || '');
        setExtraFileName(data.extraFileName || '');

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicationDetails();
  }, [appId]);
  

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    if (fieldName === 'name') {
      setName(value);
    } else if (fieldName === 'passportNumber') {
      setPassportNumber(value);
    } else if (fieldName === 'email') {
      setEmail(value);
    } else if (fieldName === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (fieldName === 'nationality') {
      setNationality(value);
    } else if (fieldName === 'countryResidence') {
      setCountryResidence(value);
    } else if (fieldName === 'type') {
      setType(value);
    } else if (fieldName === 'academicDegree') {
      setAcademicDegree(value);
    } else if (fieldName === 'semester') {
      setSemester(value);
    } else if (fieldName === 'extraFileName') {
      setExtraFileName(value);
    } else {
      setApplication({ ...application, [fieldName]: value });
    }
  };
  

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      // Update state based on the file type
      if (fileType === 'offerLetter') {
        setOfferLetter(file);
        setOfferLetterName(fileName);
        setIsOfferLetterUploaded(true);
        // If offer letter uploaded, update application type to 'Offer' unless acceptance letter and receipt are uploaded
        if (!isAcceptanceLetterUploaded || !isReceiptUploaded) {
          setApplication({ ...application, type: 'offer' });
        }
      } else if (fileType === 'acceptanceLetter') {
        setAcceptanceLetter(file);
        setAcceptanceLetterName(fileName);
        setIsAcceptanceLetterUploaded(true);
        // If acceptance letter uploaded, update application type to 'Acceptance' unless offer letter and receipt are uploaded
        if (!isOfferLetterUploaded || !isReceiptUploaded) {
          setApplication({ ...application, type: 'acceptance' });
        }
      } else if (fileType === 'receipt') {
        setReceipt(file);
        setReceiptName(fileName);
        setIsReceiptUploaded(true);
        // If receipt uploaded, update application type to 'Payment' unless offer letter and acceptance letter are uploaded
        if (!isOfferLetterUploaded || !isAcceptanceLetterUploaded) {
          setApplication({ ...application, type: 'payment' });
        }
      }
    }
  };
  
  
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    setApplication({ ...application, appType: newType });
  };
  const handleSave = async () => {
    const payload = {
      name: application.name,
      passportNumber: application.passportNumber,
      email: application.email,
      phoneNumber: application.phoneNumber,
      nationality: application.nationality,
      countryResidence: application.countryResidence,
      appType: selectedType, // Use the new appType field
      academicDegree: application.academicDegree,
      semester: application.semester,
      extraFileName: application.extraFileName,
    };
  
    try {
      await axios.put(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/applications/${appId}`, payload);
      toast.success('Application updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update application');
    }
  
    // Upload documents if necessary
    if (offerLetter || acceptanceLetter || receipt) {
      const formData = new FormData();
      if (offerLetter) formData.append('offerLetter', offerLetter);
      if (acceptanceLetter) formData.append('acceptanceLetter', acceptanceLetter);
      if (receipt) formData.append('receipt', receipt);
  
      try {
        await axios.put(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/applications/${appId}/documents`, formData);
        setSuccess(true);
        setError(null);
        toast.success('Documents uploaded successfully');
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to save documents');
        setSuccess(false);
        toast.error('Failed to save documents');
      }
    }
  };
  
  
  
  const downloadDocument = async (documentName) => {
    if (documentName) {
      try {
        const response = await fetch(`https://boss4edu-a37be3e5a8d0.herokuapp.com/api/download/${documentName}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', documentName);
        document.body.appendChild(link);
        link.click();
        toast.success(`File ${documentName} downloaded successfully.`);
      } catch (error) {
        console.error('Error downloading document:', error);
        toast.error('Error downloading document. Please try again later.');
      }
    } else {
      toast.warn('Cannot download empty file.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <Container>
      <Row>
        <Col md="4">
          <Card>
            <CardBody>
              <h4 className="card-title">Personal Information</h4>
              <Form>
                <FormGroup>
                  <Label for="name">Students Name<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter student's name"
                  value={Name} // Bind to the Name state
                  onChange={(e) => handleInputChange(e, 'name')} // Update the Name state
                />

                </FormGroup>
                 <FormGroup>
                  <Label for="passportNumber">Passport Number <span style={{ color: 'red' }}>*</span></Label>
                <Input
                  type="text"
                  id="passportNumber"
                  placeholder="Enter passport number"
                  value={PassportNumber}
                  onChange={(e) => handleInputChange(e, 'passportNumber')} // Ensure this line is correct
                />

                </FormGroup>

               
                <FormGroup>
                  <Label for="email">Email <span style={{ color: 'red' }}>*</span></Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => handleInputChange(e, 'email')}
              />
                </FormGroup>
                <FormGroup>
                  <Label for="phoneNumber">Phone Number <span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                  onChange={(e) => handleInputChange(e, 'phoneNumber')}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="nationality">Nationality <span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    type="text"
                    id="nationality"
                    placeholder="Enter nationality"
                    value={nationality}
                    onChange={(e) => handleInputChange(e, 'nationality')}
                  />

                </FormGroup>
                <FormGroup>
                  <Label for="countryResidence">Country of Residence <span style={{ color: 'red' }}>*</span></Label>
                  <Input
                  type="text"
                  id="countryResidence"
                  placeholder="Enter country of residence"
                  value={countryResidence}
                  onChange={(e) => handleInputChange(e, 'countryResidence')}
                />
                </FormGroup>
                {/* Other form groups for personal information */}
               
              </Form>
            </CardBody>
          </Card>
        </Col> 
        <Col md="4">
          <Card>
            <CardBody>
              <h4 className="card-title">University Information</h4>
              <Form>

              <FormGroup>
  <Label for="type">Student Type <span style={{ color: 'red' }}>*</span></Label>
  <Input
    type="select"
    id="type"
    value={type}
    onChange={(e) => handleInputChange(e, 'type')}
  >
    <option value="">Select Student type</option>
    <option value="newStudent">New Student</option>
    <option value="transferStudent">Transfer Student</option>
  </Input>
</FormGroup>


            <FormGroup>
            <Label for="academicDegree">Academic Degree <span style={{ color: 'red' }}>*</span></Label>
            <Input
              type="select"
              id="academicDegree"
              
              value={academicDegree}
                  onChange={(e) =>{
                handleInputChange(e, 'academicDegree');
                 setAcademicDegree(e.target.value);}}
             
            >
              <option value="">Select Academic Degree</option>
              <option value="diploma">Diploma</option>
              <option value="bachelor">Bachelor</option>
              <option value="master">Master</option>
              <option value="phd">PhD</option>
            </Input>
          </FormGroup>
                   <FormGroup>
                      <Label for="semester">Semester <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="select"
                        id="semester"
                        value={semester}
                        onChange={(e) => handleInputChange(e, 'semester')}
                     
                      >
                        <option value="">Select Semester</option>
                        <option value="fall">Fall</option>
                        <option value="spring">Spring</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
  <Label for="university">University <span style={{ color: 'red' }}>*</span></Label>
  <Input
    type="text"
    id="university"
    placeholder="Enter university"
    value={application?.university || ''}
    onChange={(e) => handleInputChange(e, 'university')}
    disabled // Add disabled attribute here
  />
</FormGroup>

<FormGroup>
  <Label for="program">Program <span style={{ color: 'red' }}>*</span></Label>
  <Input
    type="text"
    id="program"
    placeholder="Enter program"
    value={application?.program || ''}
    onChange={(e) => handleInputChange(e, 'program')}
    disabled // Add disabled attribute here
  />
</FormGroup>

                </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <h4 className="card-title">Upload Documents</h4>
              <Form>
              <FormGroup>
  <Label for="passportPhoto">Photo of Passport</Label>
  <div>
  <Button  onClick={() => downloadDocument(application?.passportPhoto)}>Download </Button>
  </div>
</FormGroup>
<FormGroup>
  <Label for="personalPhoto">Personal Photo</Label>
  <div>
  <Button onClick={() => downloadDocument(application?.personalPhoto)}>Download </Button>
  </div>
</FormGroup>
<FormGroup>
  <Label for="highSchoolCertificate">High School Certificate</Label>
  <div>
  <Button onClick={() => downloadDocument(application?.highSchoolCertificate)}>Download </Button>
  </div>
</FormGroup>
<FormGroup>
  <Label for="highSchoolCertificateEnglish">High School Certificate in English</Label>
  <div>
  <Button onClick={() => downloadDocument(application?.highSchoolCertificateEnglish)}>Download </Button>
  </div>
</FormGroup>
<FormGroup>
  <Label for="highSchoolTranscript">High School Transcript <span style={{ color: 'red' }}>*</span></Label>
  <div>
  <Button onClick={() => downloadDocument(application?.highSchoolTranscript)}>Download </Button>
  </div>
</FormGroup>
<FormGroup>
  <Label for="highSchoolTranscriptEnglish">High School Transcript in English</Label>
  <div>
  <Button onClick={() => downloadDocument(application?.highSchoolTranscriptEnglish)}>Download </Button>
  </div>
</FormGroup>
<FormGroup>
  <Label for="extraFile">Extra File</Label>
  <div>
  <Button onClick={() => downloadDocument(application?.extraFile)}>Download </Button>
  </div>
</FormGroup>

                <FormGroup>
                  <Label for="extraFileName">Extra File Name</Label>
                  <Input
                    type="text"
                    id="extraFileName"
                    value={extraFileName }
                      onChange={(e) => handleInputChange(e, 'extraFileName')}
                   
                  />
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
        <Card>
  <CardBody>
    <h4 className="card-title">University Documents</h4>
    <Form>
      <FormGroup>
        <Label for="offerLetter">Offer Letter</Label>
        <div className="d-flex align-items-center"> {/* Add a container to align items */}
          <Input
            type="file"
            id="offerLetter"
            onChange={(e) => handleFileChange(e, 'offerLetter')}
          />
          <div style={{ marginLeft: '10px' }}> {/* Add margin to create space */}
            <Button onClick={() => downloadDocument(application?.offerLetter)}>Download </Button>
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <Label for="acceptanceLetter">Acceptance Letter</Label>
        <div className="d-flex align-items-center"> {/* Add a container to align items */}
          <Input
            type="file"
            id="acceptanceLetter"
            onChange={(e) => handleFileChange(e, 'acceptanceLetter')}
          />
          <div style={{ marginLeft: '10px' }}> {/* Add margin to create space */}
            <Button onClick={() => downloadDocument(application?.acceptanceLetter)}>Download </Button>
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <Label for="receipt">Receipt</Label>
        <div className="d-flex align-items-center"> {/* Add a container to align items */}
          <Input
            type="file"
            id="receipt"
            onChange={(e) => handleFileChange(e, 'receipt')}
          />
          <div style={{ marginLeft: '10px' }}> {/* Add margin to create space */}
            <Button onClick={() => downloadDocument(application?.receipt)}>Download </Button>
          </div>
        </div>
      </FormGroup>
      <FormGroup>
                  <Label for="selectedType">Application Type</Label>
                  <Input 
                    type="select" 
                    id="selectedType" 
                    value={selectedType} 
                    onChange={handleTypeChange}
                  >
                    <option value="new">New</option>
                    <option value="waiting">Waiting</option>
                    <option value="offer">Offer</option>
                    <option value="payment">Payment</option>
                    <option value="acceptance">Acceptance</option>
                    <option value="rejected">Rejected</option>
                    <option value="complete">Complete</option>
                  </Input>
                </FormGroup>
    </Form>
  </CardBody>
</Card>

          <Button color="primary" onClick={() => handleSave(application._id)}>Save</Button>
        </Col>
      </Row>
 

    </Container>
  );
};

export default ApplicationDetails;
