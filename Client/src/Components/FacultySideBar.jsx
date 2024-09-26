import React from 'react'
import '../Stylesheets/AdminNavbar.css'
import { Link } from 'react-router-dom'

const FacultySideBar = () => {
  return (
      <div className="sidebar">
        <div className="sidebar-content">
            <nav className="nav">
                <div className="logo">
                    <img src='https://res.cloudinary.com/dzf8ewam7/image/upload/v1727342563/SOC-Connect/rl7tdycgpqeizptrpgrj.png' alt=""/>
                </div>
                <Link to="/facultyhome" className="nav-item">
                    Home
                </Link>
                <Link to="/facultypersonaldetails" className="nav-item">
                    <i className="fas fa-user"></i> Personal Details
                </Link>
                <Link to="/coursestaught" className="nav-item">
                    Courses Taught
                </Link>
                <Link to="/academicinformation" className="nav-item">
                    Academic Information
                </Link>
                <Link to="/mystudents" className="nav-item">
                    My Students
                </Link>
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

export default FacultySideBar