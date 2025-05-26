import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-zinc-950 text-white px-6 py-4 flex justify-between items-center border-b border-zinc-800 shadow-md">
      <h1 className="text-2xl font-bold text-purple-500">SmartInbox</h1>
      <div className="space-x-6 text-sm font-medium">
        <Link
          to="/login"
          className={`hover:text-purple-400 ${
            isActive("/login") ? "text-purple-500 underline" : ""
          }`}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={`hover:text-purple-400 ${
            isActive("/signup") ? "text-purple-500 underline" : ""
          }`}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
