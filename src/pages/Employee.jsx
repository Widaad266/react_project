import { useEffect, useState } from 'react'
import { api } from '../lib/api'

const STATIC_DEPARTMENTS = [
  { code: 'CW', name: 'Carwash' },
  { code: 'ST', name: 'Stock' },
  { code: 'MC', name: 'Mechanic' },
  { code: 'ADMS', name: 'Administration Staff' },
]

export default function Employee() {
  const [form, setForm] = useState({
    employeeNumber: '', firstName: '', lastName: '', position: '', address: '', telephone: '', gender: 'Male', hiredDate: '', departmentCode: 'CW'
  })
  const [message, setMessage] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await api.post('/employees', { ...form })
      setMessage('Employee saved')
      setForm({ employeeNumber: '', firstName: '', lastName: '', position: '', address: '', telephone: '', gender: 'Male', hiredDate: '', departmentCode: 'CW' })
    } catch (err) {
      setMessage('Error saving employee')
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Employee</h1>
      <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          ['employeeNumber','Employee Number'],['firstName','First Name'],['lastName','Last Name'],['position','Position'],['address','Address'],['telephone','Telephone']
        ].map(([name,label]) => (
          <div key={name}>
            <label className="text-sm text-gray-600">{label}</label>
            <input name={name} value={form[name]} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
        ))}
        <div>
          <label className="text-sm text-gray-600">Gender</label>
          <select name="gender" value={form.gender} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2">
            {['Male','Female','Other'].map(g=> <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Hired Date</label>
          <input type="date" name="hiredDate" value={form.hiredDate} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Department</label>
          <select name="departmentCode" value={form.departmentCode} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2">
            {STATIC_DEPARTMENTS.map(d=> <option key={d.code} value={d.code}>{d.name} ({d.code})</option>)}
          </select>
        </div>
        <div className="md:col-span-3 flex justify-end">
          <button className="bg-blue-600 text-white rounded px-4 py-2">Save</button>
        </div>
      </form>
      {message && <div className="mt-2 text-green-700">{message}</div>}
    </div>
  )
}