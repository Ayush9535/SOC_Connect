import React from 'react'
import StudentSideBar from '../Components/StudentSideBar'
import Student_Data_View from '../Components/Student_Overview'
import Student_intro from '../Components/Student_intro'
import StudentPersonalDetails from '../Components/StudentPersonalDetails'
import { useState } from 'react'

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
            <Student_intro /> {/* Display student intro */}
            <Student_Data_View rank_of_student='1' />  {/* Display student overview */}
          </div>
        );
      case 'studentpersonaldetails':
        return <StudentPersonalDetails />; // Display personal details
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
        <StudentSideBar onTabChange = {handleTabChange}/>
      </div>
      <div className="student-cntr">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default StudentDashboard;
