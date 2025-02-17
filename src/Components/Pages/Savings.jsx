import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Savings() {
  const [savingsData, setSavingsData] = useState([]);
  const [newSaving, setNewSaving] = useState({ amount: '', date: '' });
  const id = useSelector((state) => state.id.value);

  useEffect(() => {
    // Fetch savings data from the backend
    const fetchSavingsData = async () => {
      const response = await fetch('https://monitre-backend.onrender.com/fetch-savings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      setSavingsData(data);
    };

    fetchSavingsData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSaving({ ...newSaving, [name]: value });
  };

  const handleAddSaving = async (e) => {
    e.preventDefault();
    const response = await fetch('https://monitre-backend.onrender.com/savings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newSaving, id }),
    });
    const data = await response.json();
    setSavingsData([...savingsData, data]);
    setNewSaving({ amount: '', date: '' });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-[#04AD83] mb-6">Savings</h1>

      {/* Savings Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Total Savings: ₹{savingsData.reduce((acc, saving) => acc + saving.amount, 0)}</h2>
      </div>

      {/* Savings Chart */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Savings Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={savingsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#04AD83" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Add New Saving */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Add New Saving</h2>
        <form onSubmit={handleAddSaving} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Amount:</label>
            <input
              type="number"
              name="amount"
              value={newSaving.amount}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Date:</label>
            <input
              type="date"
              name="date"
              value={newSaving.date}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-[#04AD83] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#038b66]"
          >
            Add Saving
          </button>
        </form>
      </div>
    </div>
  );
}

export default Savings;