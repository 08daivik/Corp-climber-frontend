import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { FileText } from 'lucide-react';

const Results = () => {
  const [results, setResults] = useState([]);
  const [topRecommendation, setTopRecommendation] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('simulationResult');
    if (stored) {
      const parsed = JSON.parse(stored);
      setResults(parsed);
      const best = parsed.reduce((a, b) =>
        a.averageSuccessScore > b.averageSuccessScore ? a : b
      );
      setTopRecommendation(best);
    }
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">📊 Simulation Results</h1>
        <p className="text-gray-600 mb-8">
          Here's how each project performed based on your profile, skills, and peer interactions.
        </p>

        {/* Top Recommendation */}
        {topRecommendation && (
          <div className="bg-white shadow rounded-xl p-6 mb-10">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
              ✅ Recommended Project: {topRecommendation.projectName}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Success Probability:</strong> {(topRecommendation.successProbability * 100).toFixed(2)}%
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Expected Skill Gain:</strong> {topRecommendation.expectedSkillGain}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Synergy Score:</strong> {(topRecommendation.peerSynergyScore * 100).toFixed(1)}%
            </p>
            <p className="bg-gray-100 text-gray-800 rounded p-4 mt-4 border border-gray-200">
              <FileText className="inline-block text-indigo-500 mr-2" />
              <em>{topRecommendation.recommendation}</em>
            </p>
          </div>
        )}

        {/* Chart Section */}
        {results.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">📈 Success Score Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={results} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="projectName" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Bar dataKey="averageSuccessScore" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {results.length === 0 && (
          <div className="text-center text-gray-500 mt-10 italic">
            No simulation data found. Please run a simulation first.
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
