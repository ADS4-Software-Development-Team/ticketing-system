import React, { useState } from 'react';
import MyTickets from './MyTickets';
import SubmitTicket from './SubmitTicket';
import Dashboard from './Dashboard';

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('my-tickets');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-900">IT Support</h1>
            <div className="flex space-x-4">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'my-tickets' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('my-tickets')}
              >
                My Tickets
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'submit-ticket' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('submit-ticket')}
              >
                Submit Ticket
              </button>
        
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Profile</span>
              <span className="text-sm text-gray-700">Logout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'my-tickets' && <MyTickets />}
        {activeTab === 'submit-ticket' && <SubmitTicket />}
        {activeTab === 'dashboard' && <Dashboard />}
      
       
      </main>
    </div>
  );
}

export default UserDashboard;