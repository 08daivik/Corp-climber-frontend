import React from 'react';
import { Mail, Phone } from 'lucide-react';

const ContactInfo = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2 mb-2">
        <Mail className="text-indigo-500" />
        Contact Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g. 9876543210"
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
