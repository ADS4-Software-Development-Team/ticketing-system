import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyTickets from './components/MyTickets';
import CreateTicket from './components/CreateTicket';
import Dashboard from './components/AgentDashboard';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import AgentDashboard from './components/AgentDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">

        {/* Main content area */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/create-ticket" element={<CreateTicket/>} />
            <Route path="*" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user-dash" element={<UserDashboard />} />
            <Route path="/agent-dash" element={<AgentDashboard />} />  
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
