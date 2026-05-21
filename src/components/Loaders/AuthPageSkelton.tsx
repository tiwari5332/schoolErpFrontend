// components/SkeletonLoader.jsx
import React from "react";

const AuthPageSkelton = () => {
  return (
    <div className="flex min-h-screen justify-center items-center w-[80%] mx-auto  overflow-hidden">
      {/* Left side skeleton */}
      <div className="w-1/2 p-10 space-y-6">
        <div className="h-8 w-3/4 bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 animate-pulse rounded"></div>

        {/* Feature boxes */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-full bg-gray-300 animate-pulse rounded"
            ></div>
          ))}
        </div>

        {/* Bottom icons */}
        <div className="flex space-x-4">
          <div className="h-10 w-24 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-10 w-32 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </div>

      {/* Right side skeleton (login form) */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-3/4 space-y-6">
          <div className="h-6 w-1/2 bg-gray-300 animate-pulse rounded"></div>

          <div className="h-10 w-full bg-gray-300 animate-pulse rounded"></div>
          <div className="h-10 w-full bg-gray-300 animate-pulse rounded"></div>

          <div className="h-5 w-1/3 bg-gray-300 animate-pulse rounded"></div>

          <div className="h-12 w-full bg-gray-300 animate-pulse rounded"></div>

          <div className="flex justify-between">
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
            <div className="h-4 w-20 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageSkelton;
