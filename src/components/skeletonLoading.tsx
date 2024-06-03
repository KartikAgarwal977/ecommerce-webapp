import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Navbar skeleton */}
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <div className="w-1/4 h-8 bg-gray-300"></div>
        <div className="flex space-x-4">
          <div className="w-16 h-8 bg-gray-300"></div>
          <div className="w-16 h-8 bg-gray-300"></div>
          <div className="w-16 h-8 bg-gray-300"></div>
          <div className="w-16 h-8 bg-gray-300"></div>
        </div>
      </div>

      {/* Hero section skeleton */}
      <div className="w-full h-64 bg-gray-300 mt-4"></div>

      {/* Heading skeleton */}
      <div className="my-6 mx-4">
        <div className="h-6 w-1/4 bg-gray-300 mb-4"></div>
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
            <div className="w-full h-48 bg-gray-300 mb-4"></div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 w-3/4 h-6 bg-gray-300"></div>
              <p className="text-gray-700 text-base w-1/2 h-4 bg-gray-300"></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
