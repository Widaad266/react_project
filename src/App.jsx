import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Employee from './pages/Employee'
import Department from './pages/Department'
import Salary from './pages/Salary'
import Reports from './pages/Reports'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/department" element={<Department />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App