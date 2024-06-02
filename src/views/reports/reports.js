import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportsPage = () => {
  const [degree, setDegree] = useState('Bachelor');
  const [university, setUniversity] = useState('Harvard');
  const [language, setLanguage] = useState('English');

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Degree: ${degree}`, 10, 10);
    doc.text(`University: ${university}`, 10, 20);
    doc.text(`Language: ${language}`, 10, 30);
    doc.save('data.pdf');
  };

  return (
    <div className="card">
      <div className="card-header">Reports</div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label htmlFor="degree">Degree</label>
            <select
              id="degree"
              className="form-control"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            >
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="university">University</label>
            <select
              id="university"
              className="form-control"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            >
              <option value="Harvard">Harvard</option>
              <option value="MIT">MIT</option>
              <option value="Stanford">Stanford</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              className="form-control"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportsPage;
