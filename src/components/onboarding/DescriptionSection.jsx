import React from 'react';

const DescriptionSection = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h2>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Tell us about yourself..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors?.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description}</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionSection;
