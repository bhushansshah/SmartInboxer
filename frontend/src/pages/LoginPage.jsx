import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-gray-800 flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-2xl shadow-xl border border-zinc-800">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>

        <input
          type="email"
          placeholder="Username (email)"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-200">
          Log In
        </button>

        <div className="my-6 text-center text-gray-400">or</div>

        <button className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition duration-200">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          Log in with Google
        </button>

        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account? <a href="#" className="text-purple-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
