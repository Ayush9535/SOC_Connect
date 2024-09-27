import React from 'react'
import '../Stylesheets/AdminNavbar.css'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
      <div className="sidebar">
        <div className="sidebar-content">
            <nav className="nav">
                <div className="logo">
                    <img src='https://res.cloudinary.com/dzf8ewam7/image/upload/v1727342563/SOC-Connect/rl7tdycgpqeizptrpgrj.png' alt=""/>
                </div>
                <div className="nav-item" onClick={() => onTabChange('facultyhome')}>
            Home
          </div>
          <div className="nav-item" onClick={() => onTabChange('personalDetails')}>
            Manage Students
          </div>
          <div className="nav-item" onClick={() => onTabChange('coursesTaught')}>
            Manage Faculties
          </div>
          <div className="nav-item" onClick={() => onTabChange('academicInformation')}>
            Manage Holidays
          </div>
          <div className="nav-item" onClick={() => onTabChange('myStudents')}>
            Create Announcements
          </div>
            </nav>
            <div className="logout">
                <button className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    </div>
  )
}

export default AdminSideBar