"use client";

import { usePathname } from 'next/navigation';
import PromptBar from './components/promptBar'; // Import the prompt bar
import '../../globals.css'; // Global styles
import React, { useEffect, useState } from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname(); // Get the current path
  // const [isBouncing, setIsBouncing] = useState(false); // State for bounce effect

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const maxScrollDistance = 100; // Define how much the user can scroll down (in pixels)
  //     const scrollDistance = window.scrollY;

  //     // If the user scrolls down a little, trigger the bounce effect
  //     if (scrollDistance > 0 && scrollDistance <= maxScrollDistance) {
  //       setIsBouncing(true);
  //       setTimeout(() => {
  //         // Scroll back to the top with a smooth animation
  //         window.scrollTo({
  //           top: 0,
  //           behavior: 'smooth',
  //         });
  //         setIsBouncing(false); // Remove the bounce state after the scroll
  //       }, 300); // Set the delay for the bounce effect (300ms)
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll); // Cleanup event listener
  //   };
  // }, []);

  //  ${
  //       isBouncing ? 'bounce' : ''

  return (
    <div
      className={`min-h-screen bg-gray-900 text-white flex flex-col justify-between
      }`}
    >
      {/* Main content area */}
      <div className="flex-grow p-6 max-w-5xl mx-auto w-full flex flex-col justify-between">
        {/* Page content */}
        <div className="flex-grow flex flex-col justify-center items-center">
          {children}
        </div>

        {/* Conditionally render PromptBar only on the Gemini page */}
        {pathname === '/dashboard/ai_models/gemini' && (
          <div className="w-full max-w-5xl mx-auto">
            {/* Constrain width to the main content area */}
            <PromptBar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
