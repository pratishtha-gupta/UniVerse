import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white py-4 px-6 text-center text-2xl font-bold shadow-md">
        Universe - Your Academic Hub
      </header>
      <main className="flex flex-col items-center justify-center h-full p-6">
        <div className="max-w-lg w-full space-y-8 bg-white shadow-lg rounded-lg p-6 h-[80%]">
          <h1 className="text-center text-4xl font-bold text-gray-800">Dashboard</h1>
          <nav className="flex flex-col space-y-4 mt-8">
            <Link
              to="/announcements"
              className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-7 px-6 rounded-lg h-[80px] justify-center items-center text-center text-xl"
            >
              View Announcements
            </Link>
            <Link
              to="/notes"
              className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-7 px-6 rounded-lg h-[80px] justify-center items-center text-center text-xl"
            >
              Notes
            </Link>
            <Link
              to="/results"
              className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-7 px-6 rounded-lg h-[80px] justify-center items-center text-center text-xl"
            >
              Results
            </Link>
            <Link
              to="/edit-profile"
              className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-7 px-6 rounded-lg h-[80px] justify-center items-center text-center text-xl" 
            >
              Edit Profile
            </Link>
          </nav>
        </div>
      </main>
      <footer className="bg-blue-700 text-white py-4 px-6 text-center">
        © 2024 Universe. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
