import React, { useState } from 'react';
import FacultySideBar from '../Components/FacultySideBar';
import Student_Data_View from '../Components/Student_Overview';
import Student_intro from '../Components/Student_intro';
import FacultyPersonalDetails from '../Components/FacultyPersonalDetails';
import "../Stylesheets/FacultyDasboard.css";
import Faculty_View from '../Components/FacultyOverview';
import Faculty_Intro from '../Components/FacultyIntro';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('facultyhome');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'facultyhome':
        return (
          <div>
             {/* Display student intro */}
             <Faculty_Intro/>
            <Faculty_View rank_of_student='1' />  {/* Display student overview */}
          </div>
        );
      case 'personalDetails':
        return <FacultyPersonalDetails />; 
      case 'coursesTaught':
        return <CoursesTaughtComponent />; 
      case 'academicInformation':
        return <AcademicInformationComponent />; 
      case 'myStudents':
        return <MyStudentsComponent />; 
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
    </div>
  );
}

export default FacultyDashboard;
