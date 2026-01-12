import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const linkClass = (path) => `px-3 py-2 rounded hover:bg-blue-100 ${pathname===path?'bg-blue-50 font-semibold':'text-gray-700'}`
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">SmartPark EPMS</div>
        <div className="flex gap-2">
          <Link className={linkClass('/employee')} to="/employee">Employee</Link>
          <Link className={linkClass('/department')} to="/department">Department</Link>
          <Link className={linkClass('/salary')} to="/salary">Salary</Link>
          <Link className={linkClass('/reports')} to="/reports">Reports</Link>
          <Link className={linkClass('/login')} to="/login">Logout</Link>
        </div>
      </div>
    </nav>
  )
}