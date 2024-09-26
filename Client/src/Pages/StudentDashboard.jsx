import React from 'react'
import StudentSideBar from '../Components/StudentSideBar'
import Student_Data_View from '../Components/Student_Overview'
import Student_intro from '../Components/Student_intro'


function StudentDashboard() {
  return (
    <div>
      <div className="sidebar">
        <StudentSideBar/>
      </div>
      <div className="student-cntr">
        <Student_intro/>
        <Student_Data_View rank_of_student='1'/>
      </div>
    </div>
  )
}

export default StudentDashboard