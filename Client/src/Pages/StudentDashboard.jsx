import React, { useState } from 'react';
import StudentSideBar from '../Components/StudentSideBar';
import Student_Data_View from '../Components/Student_Overview';
import Student_intro from '../Components/Student_intro';
// import "../Stylesheets/StudentDashboard.css";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('studenthome');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'studenthome':
        return (
          <div>
            <Student_intro /> 
            <Student_Data_View rank_of_student='1' /> 
          </div>
        );
      case 'personalDetails':
        return <PersonalDetails />; 
      case 'academicInformation':
        return <AcademicInformation />; 
      case 'feedbacks':
        return <Feedbacks />; 
      default:
        return <Student_intro />;
    }
  };

  return (
    <div>
      <div className="sidebar">
        <StudentSideBar onTabChange={handleTabChange} />
      </div>
      <div className="student-cntr">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default StudentDashboard;
