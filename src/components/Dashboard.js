import React from 'react';

const Dashboard = () => {
  const stats = [
    { name: 'Open Tickets', value: 12, change: '+2', changeType: 'increase' },
    { name: 'In Progress', value: 8, change: '+1', changeType: 'increase' },
    { name: 'Resolved Today', value: 5, change: '+3', changeType: 'increase' },
    { name: 'Avg. Resolution Time', value: '2.3 days', change: '-0.5', changeType: 'decrease' },
  ];

  const recentTickets = [
    { id: 'IT-12459', subject: 'Monitor not working', status: 'Open', assignedTo: 'Unassigned', created: '1 hour ago' },
    { id: 'IT-12458', subject: 'Password reset request', status: 'In Progress', assignedTo: 'Jane Doe', created: '3 hours ago' },
    { id: 'IT-12457', subject: 'VPN connection issues', status: 'Open', assignedTo: 'John Smith', created: '5 hours ago' },
  ];

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">{stat.name}</dt>
              <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-blue-600">
                  {stat.value}
                </div>
                <div
                  className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0 ${
                    stat.changeType === 'increase'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {stat.change}
                </div>
              </dd>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Tickets</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {recentTickets.map((ticket) => (
            <li key={ticket.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">{ticket.id}</p>
                    <p className="ml-2 flex-shrink-0 flex">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                        ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {ticket.assignedTo}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {ticket.subject}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Created {ticket.created}
                    </p>
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

export default Dashboard;