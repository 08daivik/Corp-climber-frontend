import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockSkills = ['Python', 'Java', 'Machine Learning', 'Communication', 'Leadership'];
const mockPeers = [
  { id: 1, name: 'Alice Chen' },
  { id: 2, name: 'Bob Johnson' },
  { id: 3, name: 'David Patel' },
];

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [status, setStatus] = useState('PLANNING');
  const [durationMonths, setDurationMonths] = useState(6);
  const [complexityScore, setComplexityScore] = useState(5);
  const [requirements, setRequirements] = useState([]);
  const [selectedPeerIds, setSelectedPeerIds] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSkillChange = (skill) => {
    const existing = requirements.find((r) => r.skillName === skill);
    if (existing) {
      setRequirements((prev) => prev.filter((r) => r.skillName !== skill));
    } else {
      setRequirements((prev) => [
        ...prev,
        { skillName: skill, requiredLevel: 5, importanceWeight: 0.5 },
      ]);
    }
  };

  const handlePeerToggle = (id) => {
    setSelectedPeerIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const updateSkillField = (skillName, field, value) => {
    setRequirements((prev) =>
      prev.map((r) =>
        r.skillName === skillName ? { ...r, [field]: value } : r
      )
    );
  };

  const handleSubmit = async () => {
    if (!projectName || requirements.length === 0) {
      setError('Please fill in required fields.');
      return;
    }

    const payload = {
      name: projectName,
      description,
      domain,
      priority,
      status,
      durationMonths: Number(durationMonths),
      complexityScore: parseFloat(complexityScore),
      managerId: 1, // Hardcoded for now
      peerIds: selectedPeerIds,
      requirements,
    };

    try {
      const res = await fetch('http://localhost:8383/api/v1/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        navigate('/simulate');
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit project.');
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-100 via-indigo-50 to-pink-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl border border-indigo-100 p-8 rounded-xl">
        <h2 className="text-4xl font-bold text-indigo-700 mb-6 text-center">🛠️ Add New Project</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="space-y-5 text-gray-700">
          <div>
            <label className="font-medium block mb-1">📌 Project Name *</label>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g. AI Customer Analytics"
            />
          </div>

          <div>
            <label className="font-medium block mb-1">📝 Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg resize-none"
              rows={3}
              placeholder="Brief overview or goal of the project..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium block mb-1">🌍 Domain</label>
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. AI, Finance"
              />
            </div>
            <div>
              <label className="font-medium block mb-1">📊 Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium block mb-1">🛠️ Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="PLANNING">Planning</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div>
              <label className="font-medium block mb-1">⏱️ Duration (months)</label>
              <input
                type="number"
                value={durationMonths}
                min="1"
                onChange={(e) => setDurationMonths(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="font-medium block mb-1">⚙️ Complexity Score (0–10)</label>
            <input
              type="range"
              value={complexityScore}
              min="0"
              max="10"
              step="0.1"
              onChange={(e) => setComplexityScore(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Value: {complexityScore}</p>
          </div>

          {/* Skills */}
          <div>
            <label className="font-medium block mb-2">🧠 Required Skills *</label>
            <div className="flex flex-wrap gap-2">
              {mockSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillChange(skill)}
                  className={`px-3 py-1 rounded-full border ${
                    requirements.find((r) => r.skillName === skill)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            {requirements.map((r) => (
              <div
                key={r.skillName}
                className="mt-2 grid grid-cols-3 gap-3 items-center"
              >
                <span className="col-span-1">{r.skillName}</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={r.requiredLevel}
                  onChange={(e) =>
                    updateSkillField(r.skillName, 'requiredLevel', parseInt(e.target.value))
                  }
                  className="border rounded px-2 py-1"
                  placeholder="Level"
                />
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={r.importanceWeight}
                  onChange={(e) =>
                    updateSkillField(r.skillName, 'importanceWeight', parseFloat(e.target.value))
                  }
                  className="border rounded px-2 py-1"
                  placeholder="Weight"
                />
              </div>
            ))}
          </div>

          {/* Peers */}
          <div>
            <label className="font-medium block mb-2">👥 Associated Peers</label>
            <div className="flex flex-wrap gap-2">
              {mockPeers.map((peer) => (
                <button
                  key={peer.id}
                  onClick={() => handlePeerToggle(peer.id)}
                  className={`px-3 py-1 rounded-full border ${
                    selectedPeerIds.includes(peer.id)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {peer.name}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center pt-6">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 font-semibold rounded-md hover:bg-green-700 transition"
            >
              Save Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
