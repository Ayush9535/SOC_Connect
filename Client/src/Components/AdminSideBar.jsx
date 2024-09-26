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
                <Link to="/" className="nav-item">
                    <i className="fas fa-home"></i> Home
                </Link>
                <Link to="/profile" className="nav-item">
                    <i className="fas fa-user"></i> Profile
                </Link>
                <Link to="/newpost" className="nav-item">
                    <i className="fas fa-plus-square"></i> New Post
                </Link>
                <Link to="/chat" className="nav-item">
                    <i className="fas fa-envelope"></i> Messages
                </Link>
                <Link to="/notify" className="nav-item">
                    <i className="fas fa-bell"></i> Notifications
                </Link>
                <a href="/events" className="nav-item">
                    <i className="fas fa-calendar-alt"></i> Events
                </a>
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

export default AdminSideBar