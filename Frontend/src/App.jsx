// import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Just Journal</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-md">
        Capture your thoughts, ideas, and daily experiences. Write your journal entries with a 300-word limit.
      </p>
      <div className="space-x-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Get Started
        </button>
        <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
