import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyTickets from './components/MyTickets';
import SubmitTicket from './components/SubmitTicket';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">

        {/* Main content area */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/submit-ticket" element={<SubmitTicket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user-dash" element={<UserDashboard />} />
            <Route path="/" element={<LandingPage />} />

            {/* Default route */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
