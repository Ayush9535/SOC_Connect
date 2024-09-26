import React from 'react'
import StudentSideBar from '../Components/StudentSideBar'
import Student_Data_View from '../Components/Student_Overview'

function StudentDashboard() {
  return (
    <div>
      <div className="sidebar">
        <StudentSideBar/>
      </div>
      <div className="student-cntr">
        <Student_Data_View/>
      </div>
    </div>
  )
}

export default StudentDashboard