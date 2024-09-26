import React from 'react'
import '../Stylesheets/AdminNavbar.css'
import { Link } from 'react-router-dom'

const StudentSideBar = ({onTabChange}) => {
  return (
      <div className="sidebar">
        <div className="sidebar-content">
            <nav className="nav">
                <div className="logo">
                    <img src='https://res.cloudinary.com/dzf8ewam7/image/upload/v1727342563/SOC-Connect/rl7tdycgpqeizptrpgrj.png' alt=""/>
                </div>
                {/* <Link to="/studentdash" className="nav-item">
                    Student Home
                </Link>
                <Link to="/studentpersonaldetails" className="nav-item">
                    Personal Details
                </Link>
                <Link to="/academicinfo" className="nav-item">
                    Academic Information
                </Link>
                <Link to="/feedbacks" className="nav-item">
                    Feedbacks
                </Link> */}
                <div className="nav-item" onClick={() => onTabChange('studenthome')}>
            Home
          </div>
          <div className="nav-item" onClick={() => onTabChange('studentpersonaldetails')}>
            <i className="fas fa-user"></i> Personal Details
          </div>
          <div className="nav-item" onClick={() => onTabChange('coursesTaught')}>
            Courses Taught
          </div>
          <div className="nav-item" onClick={() => onTabChange('academicInformation')}>
            Academic Information
          </div>
          <div className="nav-item" onClick={() => onTabChange('myStudents')}>
            My Students
          </div>
            </nav>
            <div className="logout">
                <button className="logout-button">
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default StudentSideBar