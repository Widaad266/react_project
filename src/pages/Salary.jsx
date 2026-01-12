import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Salary() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState({ employeeNumber: '', grossSalary: '', totalDeduction: '', month: '' })
  const [list, setList] = useState([])
  const [message, setMessage] = useState('')

  // Minimal employee retrieval substitute: allow manual employee ID entry or fetch via salaries list
  useEffect(() => {
    // For demo, we rely on salary list to display; employee creation returns IDs to console if needed
    refreshList()
  }, [])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const saveSalary = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await api.post('/salaries', { ...form, grossSalary: Number(form.grossSalary), totalDeduction: Number(form.totalDeduction) })
      setMessage('Salary saved')
      setForm({ employeeNumber: '', grossSalary: '', totalDeduction: '', month: '' })
      refreshList()
    } catch (err) {
      setMessage('Error saving salary')
    }
  }

  const refreshList = async () => {
    try {
      const res = await api.get('/salaries')
      setList(res.data)
    } catch {}
  }

  const updateSalary = async (id) => {
    const grossSalary = prompt('New gross salary:')
    const totalDeduction = prompt('New total deduction:')
    if (!grossSalary || !totalDeduction) return
    await api.put(`/salaries/${id}`, { grossSalary: Number(grossSalary), totalDeduction: Number(totalDeduction) })
    refreshList()
  }

  const deleteSalary = async (id) => {
    await api.delete(`/salaries/${id}`)
    refreshList()
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Salary</h1>
      <form onSubmit={saveSalary} className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Employee Number</label>
          <input name="employeeNumber" value={form.employeeNumber} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g., EMP-001" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Gross Salary</label>
          <input type="number" name="grossSalary" value={form.grossSalary} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Total Deduction</label>
          <input type="number" name="totalDeduction" value={form.totalDeduction} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Month (YYYY-MM)</label>
          <input name="month" value={form.month} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="2025-02" />
        </div>
        <div className="md:col-span-4 flex justify-end">
          <button className="bg-blue-600 text-white rounded px-4 py-2">Save</button>
        </div>
      </form>

      <h2 className="text-lg font-semibold mt-6 mb-2">Existing Salaries</h2>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-2">Employee</th>
              <th className="text-left p-2">Month</th>
              <th className="text-right p-2">Gross</th>
              <th className="text-right p-2">Deduction</th>
              <th className="text-right p-2">Net</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="p-2">{s.employee?.firstName} {s.employee?.lastName}</td>
                <td className="p-2">{s.month}</td>
                <td className="p-2 text-right">{s.grossSalary}</td>
                <td className="p-2 text-right">{s.totalDeduction}</td>
                <td className="p-2 text-right font-semibold">{s.netSalary}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button onClick={()=>updateSalary(s._id)} className="text-blue-600">Edit</button>
                  <button onClick={()=>deleteSalary(s._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}