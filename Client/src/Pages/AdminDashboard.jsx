import React from 'react'
import AdminSideBar from '../Components/AdminSideBar'
import AdminIntro from '../Components/AdminIntro.Jsx'
import AdminView from '../Components/AdminOverview'
import '../Stylesheets/AdminDashboard.css'

function AdminDashboard() {
  return (
    <div>
      <div className="sidebar">
        <AdminSideBar/>
      </div>
      <div className="admin_cntr">
        <AdminIntro/>
        <AdminView/>
      </div>
    </div>
  )
}

export default AdminDashboard