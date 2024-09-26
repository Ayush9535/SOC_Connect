import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/Sign_Up';
import AdminDashboard from './Pages/AdminDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import AlumniDashboard from './Pages/AlumniDashboard';
import FacultyDashboard from './Pages/FacultyDashboard';
import ProtectedRoute from './ProtectedRoutes';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />

      <Route 
        path='/admindash' 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path='/studentdash' 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path='/alumnidash' 
        element={
          <ProtectedRoute allowedRoles={['alumni']}>
            <AlumniDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path='/facultydash' 
        element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default App;
