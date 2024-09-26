import React from 'react'
import AdminSideBar from '../Components/AdminSideBar'
function AdminDashboard() {
  return (
    <div>
      <div className="sidebar">
        <AdminSideBar/>
      </div>
      <div className="admin_cntr"></div>
    </div>
  )
}

export default AdminDashboard