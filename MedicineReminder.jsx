import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicineReminder = ({ backendUrl, userId }) => {
  const [form, setForm] = useState({
    medicine: '',
    dosage: 1,
    time: '',
    frequency: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const [reminders, setReminders] = useState([]);



const addReminder = async () => {
  console.log("Submitting form:", form);

  try {
    const { data } = await axios.post(
      backendUrl + '/api/user/add-reminder',
      form,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`  // ✅ correct now
        }
      }
    );

    console.log("Backend response:", data);

    if (data.success) {
      fetchReminders();
      setForm({
        medicine: '',
        dosage: 1,
        time: '',
        frequency: '',
        startDate: '',
        endDate: '',
        notes: ''
      });
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Add Reminder Error:", err.message);
    alert("Error: " + err.message);
  }
};
const fetchReminders = async () => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/user/get-reminders',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`  // ✅ correct
        }
      }
    );

    if (data.success) {
      setReminders(data.reminders);
    }
  } catch (err) {
    console.error("Error fetching reminders:", err.message);
  }
};




const deleteReminder = async (id) => {
  console.log("Deleting reminder with ID:", id);

  try {
    const { data } = await axios.post(
      backendUrl + '/api/user/delete-reminder',
      { reminderId: id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` // ✅ required
        }
      }
    );

    console.log("Delete response:", data);

    if (data.success) {
      fetchReminders();
    } else {
      alert("Delete failed: " + data.message);
    }
  } catch (err) {
    console.error("Delete error:", err.message);
    alert("Delete failed: " + err.message);
  }
};

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-10">
      {/* Form Section */}
      <div className="w-full lg:w-1/3 bg-white p-6 shadow-md rounded-md border">
        <h2 className="text-lg font-semibold mb-4 text-center">Add Medicine</h2>

        <div className="space-y-4 text-sm">
          <input
            type="text"
            placeholder="Medicine Name"
            value={form.medicine}
            onChange={e => setForm({ ...form, medicine: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Dosage"
            value={form.dosage}
            onChange={e => setForm({ ...form, dosage: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <input
            type="time"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Frequency (e.g. night)"
            value={form.frequency}
            onChange={e => setForm({ ...form, frequency: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <input
            type="date"
            value={form.startDate}
            onChange={e => setForm({ ...form, startDate: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <input
            type="date"
            value={form.endDate}
            onChange={e => setForm({ ...form, endDate: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={addReminder}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-lg font-semibold mb-4">Medicine Reminders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-slate-300">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Medicine</th>
                <th className="border p-2">Dosage</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Frequency</th>
                <th className="border p-2">Start</th>
                <th className="border p-2">End</th>
                <th className="border p-2">Notes</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((r, i) => (
                <tr key={r._id} className="hover:bg-slate-50">
                  <td className="border p-2 text-center">{i + 1}</td>
                  <td className="border p-2">{r.medicine}</td>
                  <td className="border p-2">{r.dosage}</td>
                  <td className="border p-2">{r.time}</td>
                  <td className="border p-2">{r.frequency}</td>
                  <td className="border p-2">{new Date(r.startDate).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(r.endDate).toLocaleDateString()}</td>
                  <td className="border p-2">{r.notes}</td>
                  <td className="border p-2 text-center">
                    <button onClick={() => deleteReminder(r._id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {reminders.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={9}>No reminders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicineReminder;
