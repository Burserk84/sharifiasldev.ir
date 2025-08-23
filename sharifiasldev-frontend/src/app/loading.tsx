import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="flex items-center gap-x-3">
        {/* Three pulsing dots for the animation */}
        <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
        <div
          className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
          style={{ animationDelay: "200ms" }} // Stagger the animation
        ></div>
        <div
          className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
          style={{ animationDelay: "400ms" }} // Stagger the animation
        ></div>
      </div>
      <p className="mt-4 text-gray-400">...در حال بارگذاری</p>
      {/* This text is hidden visually but read by screen readers for accessibility */}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
