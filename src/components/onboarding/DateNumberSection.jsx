import React from 'react';

const DateNumberSection = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Dates & Numbers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Birth Date */}
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Birth Date
          </label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Appointment Date & Time */}
        <div>
          <label htmlFor="appointmentDateTime" className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Date & Time
          </label>
          <input
            type="datetime-local"
            name="appointmentDateTime"
            id="appointmentDateTime"
            value={formData.appointmentDateTime}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleInputChange}
            min="1"
            max="120"
            className={`w-full border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.age && (
            <p className="text-sm text-red-600 mt-1">{errors.age}</p>
          )}
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
            Annual Salary ($)
          </label>
          <input
            type="number"
            name="salary"
            id="salary"
            value={formData.salary}
            onChange={handleInputChange}
            min="0"
            step="1000"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DateNumberSection;
