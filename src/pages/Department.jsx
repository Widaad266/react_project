import { useState } from 'react'
import { api } from '../lib/api'

export default function Department() {
  const [departmentCode, setDepartmentCode] = useState('')
  const [departmentName, setDepartmentName] = useState('')
  const [grossSalary, setGrossSalary] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await api.post('/departments', { departmentCode, departmentName, grossSalary: Number(grossSalary) })
      setMessage('Department saved')
      setDepartmentCode(''); setDepartmentName(''); setGrossSalary('')
    } catch (err) {
      setMessage('Error saving department')
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Department</h1>
      <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-600">Code</label>
          <input value={departmentCode} onChange={(e)=>setDepartmentCode(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input value={departmentName} onChange={(e)=>setDepartmentName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Gross Salary</label>
          <input type="number" value={grossSalary} onChange={(e)=>setGrossSalary(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div className="md:col-span-3 flex justify-end">
          <button className="bg-blue-600 text-white rounded px-4 py-2">Save</button>
        </div>
      </form>
      {message && <div className="mt-2 text-green-700">{message}</div>}
    </div>
  )
}