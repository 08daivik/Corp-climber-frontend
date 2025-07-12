import React, { useState } from 'react';

const UploadQuiz = () => {
  const [form, setForm] = useState({
    personName: '',
    participantType: '',
    summaryText: '',
    emotionTone: '',
    ratingScore: 3,
  });

  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () => {
    return (
      form.personName.trim() &&
      form.participantType &&
      form.summaryText.trim() &&
      form.emotionTone
    );
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      person: form.personName,
      role: form.participantType,
      text: form.summaryText,
      tone: form.emotionTone,
      rating: Number(form.ratingScore),
    };

    try {
      const response = await fetch('http://localhost:8080/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [payload] }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setForm({
          personName: '',
          participantType: '',
          summaryText: '',
          emotionTone: '',
          ratingScore: 3,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting interaction:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fe] px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          🧠 Interaction Quiz
        </h1>

        <div className="space-y-6 text-gray-800">

          {/* Person Name */}
          <div>
            <label className="block font-semibold text-purple-800 mb-1">
              🧍‍♂️ Who did you talk to?
            </label>
            <input
              type="text"
              name="personName"
              value={form.personName}
              onChange={handleChange}
              placeholder="Enter their name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block font-semibold text-purple-800 mb-1">
              🧑‍💼 What is their role?
            </label>
            <select
              name="participantType"
              value={form.participantType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Role</option>
              <option value="peer">Peer</option>
              <option value="coworker">Coworker</option>
              <option value="manager">Manager</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          {/* Summary */}
          <div>
            <label className="block font-semibold text-purple-800 mb-1">
              📝 What was discussed?
            </label>
            <textarea
              name="summaryText"
              value={form.summaryText}
              onChange={handleChange}
              rows={4}
              placeholder="Summarize your interaction"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Emotional Tone */}
          <div>
            <label className="block font-semibold text-purple-800 mb-2">
              🎭 Emotional tone?
            </label>
            <div className="flex flex-wrap gap-4">
              {['positive', 'neutral', 'negative', 'mixed'].map((tone) => (
                <label key={tone} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="emotionTone"
                    value={tone}
                    checked={form.emotionTone === tone}
                    onChange={handleChange}
                  />
                  <span className="capitalize">{tone}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block font-semibold text-purple-800 mb-1">
              ⭐ Helpfulness (1–5)
            </label>
            <input
              type="range"
              name="ratingScore"
              min="1"
              max="5"
              value={form.ratingScore}
              onChange={handleChange}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-1">Rating: {form.ratingScore}</p>
          </div>

          {/* Submit Button */}
          <div className="pt-6 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-md font-semibold shadow-md transition duration-200
                ${isSubmitting
                  ? 'bg-indigo-300 text-white cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-100 text-green-800 text-center p-3 rounded mt-4">
              ✅ Interaction submitted successfully!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-100 text-red-800 text-center p-3 rounded mt-4">
              ❌ Please fill all fields correctly before submitting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadQuiz;
