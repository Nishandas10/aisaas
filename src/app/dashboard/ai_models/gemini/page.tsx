"use client"
import React from 'react';
import { FaLightbulb, FaTshirt, FaEnvelopeOpenText, FaPlane } from 'react-icons/fa';
import Header from '../components/header';


const GeminiPage: React.FC = () => {
 
//ing spiner if you prefer
  return (
    <div className={`flex flex-col justify-between min-h-screen bg-gray-900`}>
      {/* Main Content */}
      <div className="flex flex-col justify-center items-center text-center space-y-12 p-6 flex-grow">
        {/* Header */}
        <Header />
        {/* Central Icon */}
        <div className="text-6xl mb-12">
          <FaLightbulb className="text-white" /> {/* Central icon */}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Each card */}
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
            <FaLightbulb className="text-yellow-400 mb-4 text-2xl" />
            <span>Activities to make friends in new city</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
            <FaTshirt className="text-purple-400 mb-4 text-2xl" />
            <span>Pick outfit to look good on camera</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
            <FaEnvelopeOpenText className="text-pink-400 mb-4 text-2xl" />
            <span>Text inviting neighbors to barbecue</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
            <FaPlane className="text-yellow-400 mb-4 text-2xl" />
            <span>Plan a relaxing day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiPage;