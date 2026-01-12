import { useState } from 'react'
import { login } from '../lib/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      navigate('/employee')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center mt-12">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">
          <span className="text-sm text-gray-600">Username</span>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} className="mt-1 w-full border rounded px-3 py-2"/>
        </label>
        <label className="block mb-4">
          <span className="text-sm text-gray-600">Password</span>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full border rounded px-3 py-2"/>
        </label>
        <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">Login</button>
      </form>
    </div>
  )
}