import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Simulating login status - replace with actual logic or context
  const isLoggedIn = localStorage.getItem("smart-inboxer"); // or useContext(AuthContext)
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("smart-inboxer"); // Clear token
    navigate("/login");              // Redirect to login
  };

  return (
    <nav className="bg-zinc-950 text-white px-6 py-4 flex justify-between items-center border-b border-zinc-800 shadow-md">
      <h1 className="text-2xl font-bold text-purple-500">SmartInbox</h1>
      <div className="space-x-6 text-sm font-medium">
        {!isLoggedIn && (
          <>
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
          </>
        )}

        {isLoggedIn && location.pathname !== "/" && (
          <button
            onClick={handleLogout}
            className="hover:text-purple-400 text-sm font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
