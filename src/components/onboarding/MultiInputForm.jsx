import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MultiInputForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    careerGoals: [''],
    skills: [
      {
        skillName: '',
        currentLevel: '',
        targetLevel: '',
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.department.trim()) newErrors.department = 'Required';
    if (!formData.role.trim()) newErrors.role = 'Required';

    formData.skills.forEach((skill, i) => {
      if (!skill.skillName || !skill.currentLevel || !skill.targetLevel) {
        newErrors[`skill-${i}`] = 'Complete all skill fields';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (i, value) => {
    const updated = [...formData.careerGoals];
    updated[i] = value;
    setFormData((prev) => ({ ...prev, careerGoals: updated }));
  };

  const addGoal = () =>
    setFormData((prev) => ({
      ...prev,
      careerGoals: [...prev.careerGoals, ''],
    }));

  const handleSkillChange = (index, key, value) => {
    const updated = [...formData.skills];
    updated[index][key] = value;
    setFormData((prev) => ({ ...prev, skills: updated }));
  };

  const addSkill = () =>
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { skillName: '', currentLevel: '', targetLevel: '' }],
    }));

  const handleSubmit = async () => {
    if (!validate()) {
      setSubmitStatus('validation-error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');
    try {
      const response = await fetch('http://localhost:8383/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmitStatus('success');
      setTimeout(() => navigate('/upload'), 1500);
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-10 px-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">🚀 Onboarding</h1>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 mt-1"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 mt-1"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email, Department, Role */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 mt-1"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 mt-1"
            />
            {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 mt-1"
            />
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>
        </div>

        {/* Career Goals */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Career Goals</label>
          {formData.careerGoals.map((goal, i) => (
            <input
              key={i}
              type="text"
              value={goal}
              onChange={(e) => handleGoalChange(i, e.target.value)}
              className="w-full border rounded-md px-4 py-2 mb-2"
              placeholder={`Goal ${i + 1}`}
            />
          ))}
          <button
            type="button"
            className="text-indigo-600 font-medium text-sm mt-1 hover:underline"
            onClick={addGoal}
          >
            + Add Another Goal
          </button>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <label className="block font-medium text-gray-700 mb-2">Skills</label>
          {formData.skills.map((skill, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <input
                type="text"
                placeholder="Skill Name"
                value={skill.skillName}
                onChange={(e) => handleSkillChange(i, 'skillName', e.target.value)}
                className="border rounded-md px-4 py-2"
              />
              <input
                type="number"
                placeholder="Current Level"
                value={skill.currentLevel}
                onChange={(e) => handleSkillChange(i, 'currentLevel', e.target.value)}
                className="border rounded-md px-4 py-2"
              />
              <input
                type="number"
                placeholder="Target Level"
                value={skill.targetLevel}
                onChange={(e) => handleSkillChange(i, 'targetLevel', e.target.value)}
                className="border rounded-md px-4 py-2"
              />
              {errors[`skill-${i}`] && (
                <p className="text-red-500 text-sm col-span-3">{errors[`skill-${i}`]}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-indigo-600 font-medium text-sm mt-1 hover:underline"
            onClick={addSkill}
          >
            + Add Another Skill
          </button>
        </div>

        {/* Submit */}
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg text-white font-semibold transition ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit & Continue'}
          </button>
          {submitStatus === 'validation-error' && (
            <p className="text-red-600 mt-3">Please fix the errors before submitting.</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 mt-3">Error submitting. Please try again.</p>
          )}
          {submitStatus === 'success' && (
            <p className="text-green-600 mt-3">Successfully submitted! Redirecting...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiInputForm;
