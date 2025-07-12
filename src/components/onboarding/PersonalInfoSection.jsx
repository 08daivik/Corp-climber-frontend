import React from 'react';

const PersonalInfoSection = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
