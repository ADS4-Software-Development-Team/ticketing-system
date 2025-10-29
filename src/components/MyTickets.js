import React, { useState } from 'react';

const MyTickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const tickets = [
    {
      id: 'IT-12456',
      subject: 'Cannot connect to the office Wi-Fi',
      status: 'In Progress',
      lastUpdated: '2 hours ago',
      assignedTo: 'Jane Doe'
    },
    {
      id: 'IT-12455',
      subject: 'Software installation request for Figma',
      status: 'Open',
      lastUpdated: '1 day ago',
      assignedTo: 'John Smith'
    },
    {
      id: 'IT-12450',
      subject: 'Request for a new keyboard',
      status: 'Resolved',
      lastUpdated: '3 days ago',
      assignedTo: 'Samantha Bee'
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Support Tickets</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by keyword, ticket ID..."
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium text-gray-700">Status:</span>
              <select 
                className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium text-gray-700">Sort by:</span>
              <select 
                className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Status">Status</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200"></div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 sm:px-6">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">STATUS</div>
            <div className="col-span-2">TICKET ID</div>
            <div className="col-span-4">SUBJECT</div>
            <div className="col-span-2">LAST UPDATED</div>
            <div className="col-span-1">ASSIGNED TO</div>
          </div>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {filteredTickets.map(ticket => (
            <li key={ticket.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="col-span-2 text-sm font-medium text-gray-900">{ticket.id}</div>
                  <div className="col-span-4 text-sm text-gray-900">{ticket.subject}</div>
                  <div className="col-span-2 text-sm text-gray-500">{ticket.lastUpdated}</div>
                  <div className="col-span-1 text-sm text-gray-500">{ticket.assignedTo}</div>
                  <div className="col-span-12 sm:col-span-0 flex justify-end mt-2 sm:mt-0">
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyTickets;