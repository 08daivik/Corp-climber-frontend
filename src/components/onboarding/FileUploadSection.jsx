import React from 'react';

const FileUploadSection = ({ handleFileChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">File Uploads</h2>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div>
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Profile Picture
          </label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition"
          />
        </div>

        {/* Multiple Documents */}
        <div>
          <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Documents (PDF, DOCX, TXT)
          </label>
          <input
            type="file"
            name="documents"
            id="documents"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.doc,.docx,.txt"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;
