import React from 'react'
import StudentSideBar from '../Components/StudentSideBar'
import Student_Data_View from '../Components/Student_Overview'
import Student_intro from '../Components/Student_intro'
import StudentPersonalDetails from '../Components/StudentPersonalDetails'
import { useState } from 'react'
import "../Stylesheets/StudentDashbord.css"

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('studenthome')
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'studenthome':
        return (
          <div>
            <Student_intro /> 
            <Student_Data_View rank_of_student='1' />  
          </div>
        );
      case 'studentpersonaldetails':
        return <StudentPersonalDetails />; 
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
        <StudentSideBar onTabChange = {handleTabChange}/>
      </div>
      <div className="student-cntr">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default StudentDashboard;
