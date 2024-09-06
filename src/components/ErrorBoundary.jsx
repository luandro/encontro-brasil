import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const ErrorBoundary = ({ error }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
    <div className="max-w-md w-full bg-white shadow-2xl rounded-lg p-10 text-center transform hover:scale-105 transition-all duration-300">
      <ExclamationTriangleIcon className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-600 mb-6">{error?.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => window.location.href = '/'}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Return to Home
      </button>
    </div>
  </div>
);

export default ErrorBoundary;
