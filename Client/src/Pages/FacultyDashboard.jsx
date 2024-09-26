import React, { useState } from 'react';
import FacultySideBar from '../Components/FacultySideBar';
import Student_Data_View from '../Components/Student_Overview';
import Student_intro from '../Components/Student_intro';
import FacultyPersonalDetails from '../Components/FacultyPersonalDetails';
import "../Stylesheets/FacultyDasboard.css";

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('facultyhome'); // Default active tab

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to render components based on active tab
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'facultyhome':
        return (
          <div>
            <Student_intro /> {/* Display student intro */}
            <Student_Data_View rank_of_student='1' />  {/* Display student overview */}
          </div>
        );
      case 'personalDetails':
        return <FacultyPersonalDetails />; // Display personal details
      case 'coursesTaught':
        return <CoursesTaughtComponent />; // Replace with the actual component for courses taught
      case 'academicInformation':
        return <AcademicInformationComponent />; // Replace with the actual component for academic information
      case 'myStudents':
        return <MyStudentsComponent />; // Replace with the actual component for my students
      default:
        return <Student_intro />; // Default to student intro if no match
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
    </div>
  );
}

export default FacultyDashboard;
