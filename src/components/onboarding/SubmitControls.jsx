import React from 'react';
import { Send, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const SubmitControls = ({ handleSubmit, handleReset, isSubmitting, submitStatus }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
        <button
          type="button"
          onClick={handleReset}
          disabled={isSubmitting}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg flex items-center gap-2 border border-gray-300 shadow-sm transition-all duration-200"
        >
          <RefreshCw size={18} />
          Reset
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200 disabled:opacity-50"
        >
          <Send size={18} />
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {/* Status messages */}
      {submitStatus === 'validation-error' && (
        <div className="mt-6 flex items-center justify-center gap-2 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md shadow-sm">
          <AlertCircle size={18} />
          <span>Please fix the highlighted errors.</span>
        </div>
      )}

      {submitStatus === 'success' && (
        <div className="mt-6 flex items-center justify-center gap-2 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md shadow-sm">
          <CheckCircle size={18} />
          <span>Form submitted successfully!</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-6 flex items-center justify-center gap-2 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md shadow-sm">
          <XCircle size={18} />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}
    </>
  );
};

export default SubmitControls;
