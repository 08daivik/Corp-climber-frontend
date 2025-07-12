import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, SlidersHorizontal } from 'lucide-react';

const Simulate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skillWeight, setSkillWeight] = useState(0.5);
  const [peerWeight, setPeerWeight] = useState(0.3);
  const [goalWeight, setGoalWeight] = useState(0.2);
  const navigate = useNavigate();

  const handleSimulate = async () => {
    setLoading(true);
    setError('');

    const payload = {
      userId: 1,
      candidateProjectIds: [1, 2, 3], // Replace later with dynamic project IDs
      priorityWeights: {
        SKILL_GROWTH: parseFloat(skillWeight),
        PEER_SYNERGY: parseFloat(peerWeight),
        GOAL_ALIGNMENT: parseFloat(goalWeight),
      },
      simulationTrials: 5000,
    };

    try {
      const response = await fetch('http://localhost:8383/api/v1/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      localStorage.setItem('simulationResult', JSON.stringify(data));
      navigate('/results');
    } catch (err) {
      console.error('Simulation error:', err);
      setError('Simulation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="w-full max-w-3xl bg-white p-8 shadow-md rounded-xl border border-indigo-100">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">🚀 Run AI Simulation</h1>
        <p className="text-center text-gray-600 mb-8">
          We'll simulate success probability, skill growth, and peer synergy for your projects.
        </p>

        {/* Priority Weights */}
        <div className="space-y-6 mb-10">
          <h2 className="text-xl font-semibold text-purple-800 flex items-center gap-2">
            <SlidersHorizontal className="text-indigo-600" /> Priority Weights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Skill Growth</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={skillWeight}
                onChange={(e) => setSkillWeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Peer Synergy</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={peerWeight}
                onChange={(e) => setPeerWeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Goal Alignment</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleSimulate}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition duration-200
              ${loading
                ? 'bg-indigo-300 text-white cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
            `}
          >
            {loading ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* View Projects Card */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700 text-center">📁 View Added Projects</h2>

          <div
            onClick={() => navigate('/projects')}
            className="cursor-pointer bg-white border border-indigo-100 hover:shadow-xl transition-all duration-300 p-6 rounded-xl flex flex-col items-center gap-3 max-w-md mx-auto"
          >
            <FolderOpen size={36} className="text-indigo-600" />
            <h3 className="text-lg font-medium text-indigo-800">View Your Current Projects</h3>
            <p className="text-gray-500 text-sm">
              Browse the projects you've added and their associated peers/skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulate;
