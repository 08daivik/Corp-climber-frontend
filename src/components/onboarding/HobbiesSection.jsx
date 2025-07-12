import React from 'react';

const HobbiesSection = ({ formData, handleInputChange }) => {
  const hobbyOptions = [
    'Reading',
    'Gaming',
    'Sports',
    'Music',
    'Travel',
    'Cooking',
    'Photography',
    'Art',
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Hobbies & Preferences</h2>

      {/* Hobbies */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select your hobbies
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {hobbyOptions.map((hobby) => (
            <label key={hobby} className="flex items-center gap-2 text-gray-700 text-sm">
              <input
                type="checkbox"
                name="hobbies"
                value={hobby.toLowerCase()}
                checked={formData.hobbies.includes(hobby.toLowerCase())}
                onChange={handleInputChange}
                className="accent-indigo-600"
              />
              {hobby}
            </label>
          ))}
        </div>
      </div>

      {/* Newsletter and Terms */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-gray-700 text-sm">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
            className="accent-indigo-600"
          />
          Subscribe to newsletter
        </label>

        <label className="flex items-center gap-2 text-gray-700 text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            className="accent-indigo-600"
            required
          />
          I agree to the terms and conditions *
        </label>
      </div>
    </div>
  );
};

export default HobbiesSection;
