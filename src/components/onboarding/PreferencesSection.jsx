import React from 'react';

const PreferencesSection = ({ formData, handleInputChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Experience Slider */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience: {formData.experience}
          </label>
          <input
            type="range"
            name="experience"
            id="experience"
            min="0"
            max="20"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Favorite Color */}
        <div>
          <label htmlFor="favoriteColor" className="block text-sm font-medium text-gray-700 mb-1">
            Favorite Color
          </label>
          <input
            type="color"
            name="favoriteColor"
            id="favoriteColor"
            value={formData.favoriteColor}
            onChange={handleInputChange}
            className="w-12 h-12 p-1 border border-gray-300 rounded-md bg-white cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
