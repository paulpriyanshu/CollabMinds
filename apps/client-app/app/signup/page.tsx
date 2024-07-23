"use client";

import React from "react";
import dynamic from "next/dynamic";


const DynamicImage = dynamic(() => import("next/image"), { ssr: false });


const dynamicSignIn = dynamic(() => import("next-auth/react").then(mod => mod.signIn), { ssr: false });


const DynamicFcGoogle = dynamic(() => import("react-icons/fc").then(mod => mod.FcGoogle), { ssr: false });

const Signup = React.memo(() => {
  const handleSignIn = () => {
    dynamicSignIn("google");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Animation Section */}
      <div className="w-full md:w-2/3 flex flex-col justify-center items-center bg-black text-white p-4 md:p-8">
        <div className="mb-6">
          <DynamicImage
            src="/logo.png" // Ensure correct path
            alt="CollabMinds"
            width={256} // Adjust width as needed
            height={64}  // Adjust height as needed
            className="w-48 md:w-64"
          />
        </div>
        <h1 className="text-5xl md:text-6xl animate-bounce font-sans">
          <span className="text-red-500 font-extrabold">Welcome</span> to our website
        </h1>
      </div>

      {/* Signup Form */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center bg-gray-100 p-4 md:p-8">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold mb-6">
            Sign in with your Gmail
          </h2>
          <button
            onClick={handleSignIn}
            className="flex items-center justify-center px-10 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            <DynamicFcGoogle className="mr-2" size={24} /> {/* Adjust size if needed */}
            <span className="hidden md:inline">Sign up with Google</span>
            <span className="md:hidden">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default Signup;
