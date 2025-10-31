import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to the IT Support Ticketing System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Streamline your IT issue reporting, manage support tickets, and connect with our technical team — all in one place.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-6">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </Link>

      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} IT Support Department | Dekago Ticketing System
      </footer>
    </div>
  );
};

export default LandingPage;
