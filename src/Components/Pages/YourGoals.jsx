import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function YourGoals() {
  const [goalsData, setGoalsData] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', deadline: '' });
  const id = useSelector((state) => state.id.value);

  useEffect(() => {
    // Fetch goals data from the backend
    const fetchGoalsData = async () => {
      const response = await fetch('http://127.0.0.1:3000/fetch-goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      setGoalsData(data);
    };

    fetchGoalsData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:3000/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newGoal, id }),
    });
    const data = await response.json();
    setGoalsData([...goalsData, data]);
    setNewGoal({ title: '', description: '', deadline: '' });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-[#04AD83] mb-6">Your Goals</h1>

      {/* Goals Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Total Goals: {goalsData.length}</h2>
      </div>

      {/* Display Goals */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goalsData.map((goal, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
              <p className="text-gray-700 mb-2">{goal.description}</p>
              <p className="text-gray-700 mb-2">Deadline: {goal.deadline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Goal */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Add New Goal</h2>
        <form onSubmit={handleAddGoal} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={newGoal.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Description:</label>
            <textarea
              name="description"
              value={newGoal.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={newGoal.deadline}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-[#04AD83] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#038b66]"
          >
            Add Goal
          </button>
        </form>
      </div>
    </div>
  );
}

export default YourGoals;