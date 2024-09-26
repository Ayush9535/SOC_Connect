import React from 'react'
import StudentSideBar from '../Components/StudentSideBar'

function StudentDashboard() {
  return (
    <div>
      <div className="sidebar">
        <StudentSideBar/>
      </div>
      <div className="student-cntr"></div>
    </div>
  )
}

export default StudentDashboard