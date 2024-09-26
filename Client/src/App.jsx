import React from 'react'
import {Routes , Route} from "react-router-dom"
import Login from './Pages/Login'
import SignUp from './Pages/Sign_Up'
import AdminDashboard from './Pages/AdminDashboard'
import StudentDashboard from './Pages/StudentDashboard'
import AlumniDashboard from './Pages/AlumniDashboard'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/admindash' element={<AdminDashboard/>}></Route>
        <Route path='/alumnidash' element={<AlumniDashboard/>}></Route>
        <Route path='/studentdash' element={<StudentDashboard/>}></Route>
    </Routes>
  )
}

export default App
