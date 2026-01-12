import { useState } from 'react'
import { api } from '../lib/api'

export default function Reports() {
  const [month, setMonth] = useState('')
  const [rows, setRows] = useState([])

  const fetchReport = async () => {
    if (!month) return
    const res = await api.get('/reports/monthly', { params: { month } })
    setRows(res.data)
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Monthly Payroll Report</h1>
      <div className="flex gap-2 items-end">
        <div>
          <label className="text-sm text-gray-600">Month (YYYY-MM)</label>
          <input value={month} onChange={(e)=>setMonth(e.target.value)} className="mt-1 border rounded px-3 py-2" placeholder="2025-02" />
        </div>
        <button onClick={fetchReport} className="bg-blue-600 text-white rounded px-4 py-2">Generate</button>
      </div>
      <div className="bg-white rounded shadow overflow-x-auto mt-4">
        <table className="min-w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-2">First Name</th>
              <th className="text-left p-2">Last Name</th>
              <th className="text-left p-2">Position</th>
              <th className="text-left p-2">Department</th>
              <th className="text-right p-2">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{r.firstName}</td>
                <td className="p-2">{r.lastName}</td>
                <td className="p-2">{r.position}</td>
                <td className="p-2">{r.department}</td>
                <td className="p-2 text-right font-semibold">{r.netSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}