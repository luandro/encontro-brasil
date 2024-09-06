import React from 'react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const ErrorBoundary = ({ error }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
      <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-600 mb-6">{error?.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

export default ErrorBoundary;
