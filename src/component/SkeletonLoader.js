import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SkeletonLoader = () => {
  return (
    <div>
      {/* Navbar Skeleton */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-32 h-8 bg-gray-300 rounded"></div>
          {/* Add other Navbar elements as needed */}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="bg-white overflow-hidden relative lg:flex lg:items-center my-20">
        <div className="w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
            <span className="block">
              <div className="w-2/3 h-8 bg-gray-300 rounded"></div>
            </span>
          </h2>
          <p className="text-md mt-4 text-gray-500">
            <div className="w-full h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
            <div className="w-2/3 h-4 bg-gray-300 rounded mt-2"></div>
          </p>
          <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-12 inline-flex rounded-md shadow">
              <div className="w-48 h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8 p-8 lg:p-24">
          <div className="w-1/2">
            <div className="w-full h-96 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div className="w-48 h-48 mb-8 bg-gray-300 rounded"></div>
            <div className="w-48 h-48 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Additional Sections Skeleton */}
      <div className="relative z-20 flex items-center bg-gray-100 dark:bg-gray-800 bg-custom-middle">
        <div className="container relative flex flex-col items-center justify-between px-6 py-8 mx-auto">
          <div className="flex flex-col">
            <div className="w-full h-16 bg-gray-300 rounded mb-4"></div>
            <hr className="w-1/2 my-2 border-gray-300 dark:border-gray-600" />
            <div className="w-full h-24 bg-gray-300 rounded mb-8"></div>
            <div className="flex items-center justify-center">
              <div className="w-32 h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section Skeleton */}
      <div className="px-4 py-20 bg-gray-200">
        <div className="flex flex-col max-w-6xl mx-auto md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="w-full h-16 bg-gray-300 rounded mb-4"></div>
            <hr className="w-1/2 my-2 border-gray-300 dark:border-gray-600" />
            <div className="w-full h-24 bg-gray-300 rounded mb-8"></div>
          </div>
          <dl className="w-full md:w-2/3">
            <dt className="mb-4">
              <div className="w-full h-12 bg-gray-300 rounded"></div>
            </dt>
            <dd className="mb-16">
              <div className="w-full h-24 bg-gray-300 rounded"></div>
            </dd>
            <dt className="mb-4">
              <div className="w-full h-12 bg-gray-300 rounded"></div>
            </dt>
            <dd className="mb-16">
              <div className="w-full h-24 bg-gray-300 rounded"></div>
            </dd>
            <dt className="mb-4">
              <div className="w-full h-12 bg-gray-300 rounded"></div>
            </dt>
            <dd className="mb-16">
              <div className="w-full h-24 bg-gray-300 rounded"></div>
            </dd>
          </dl>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto">
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          {/* Add other Footer elements as needed */}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
