import React from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-gray-800 flex flex-col">
      {/* <nav className="bg-zinc-950 text-white px-6 py-4 flex justify-between items-center border-b border-zinc-800">
        <h1 className="text-xl font-bold">SmartInbox</h1>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-purple-400">Login</Link>
          <Link to="/signup" className="hover:text-purple-400">Sign Up</Link>
        </div>
      </nav> */}

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-zinc-950 p-8 rounded-2xl shadow-xl border border-zinc-800">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-6 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-200">
            Sign Up
          </button>

          <p className="mt-6 text-sm text-center text-gray-500">
            Already have an account? <Link to="/login" className="text-purple-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
