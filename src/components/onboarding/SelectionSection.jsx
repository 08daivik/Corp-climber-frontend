import React from 'react';

const SelectionSection = ({ formData, handleInputChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Selections</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Country</option>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="india">India</option>
            <option value="australia">Australia</option>
          </select>
        </div>

        {/* Profession */}
        <div>
          <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
            Profession
          </label>
          <select
            name="profession"
            id="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Profession</option>
            <option value="developer">Software Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="analyst">Data Analyst</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectionSection;
