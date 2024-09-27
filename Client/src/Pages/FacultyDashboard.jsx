import React, { useEffect, useState } from 'react';
import FacultySideBar from '../Components/FacultySideBar';
import Student_intro from '../Components/Student_intro';
import FacultyPersonalDetails from '../Components/FacultyPersonalDetails';
import "../Stylesheets/FacultyDasboard.css";
import Faculty_View from '../Components/FacultyOverview';
import Faculty_Intro from '../Components/FacultyIntro';
import CreateAssignment from '../Components/CreateAssignment';
import Modal from 'react-modal'; 
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

Modal.setAppElement('#root');

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('facultyhome');
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedStudent, setSelectedStudent] = useState(null); 
  const [feedbackMessage, setFeedbackMessage] = useState(''); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getStudents');
        setStudents(response.data);  
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents(); 
  }, []);

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setFeedbackMessage(''); 
  };

  const handleFeedbackSubmit = async () => {
    try {

        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);

        const response = await axios.post('http://localhost:3000/submitFeedback', {
            studentId: selectedStudent._id,
            feedback: {message: feedbackMessage, facultyId: decoded.email},
        });
        console.log(`Feedback successfully submitted for ${selectedStudent.name}: ${feedbackMessage}`);
        console.log('Server response:', response.data);
        alert('Feedback submitted successfully!');
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
    }
    closeModal();
};


  const renderActiveTab = () => {
    switch (activeTab) {
      case 'facultyhome':
        return (
          <div>
             <Faculty_Intro/>
            <Faculty_View rank_of_student='1' onTabChange={handleTabChange} /> 
          </div>
        );
      case 'classList':
        return (
          <div>
            <h2>Class List</h2>
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student.name || 'NA'}</td>
                    <td>{student.email || 'NA'}</td>
                    <td>
                      <button onClick={() => openModal(student)}>Give Feedback</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'personalDetails':
        return <FacultyPersonalDetails />;
      case 'createassignment':
        return <CreateAssignment />;
      default:
        return <Student_intro />;
    }
  };

  return (
    <div>
      <div className="sidebar">
        <FacultySideBar onTabChange={handleTabChange} />
      </div>
      <div className="faculty-cntr">
        {renderActiveTab()}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Give Feedback"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Give Feedback for {selectedStudent?.name}</h2>
        <textarea
          value={feedbackMessage}
          onChange={(e) => setFeedbackMessage(e.target.value)}
          placeholder="Enter your feedback here"
          rows="5"
          cols="50"
        />
        <div>
          <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default FacultyDashboard;
