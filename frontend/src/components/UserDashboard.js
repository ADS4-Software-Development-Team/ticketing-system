import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Import the centralized API instance

const Dashboard = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    new: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) {
        alert('You must be logged in to view this page.');
        navigate('/login');
        return;
      }

      try {
        const response = await api.get('/tickets');
        if (response.data.success) {
          // Filter tickets to only show those created by the logged-in user.
          const myTickets = response.data.tickets.filter(ticket => ticket.user_id === user._id);
          setTickets(myTickets);

          // Calculate stats
          setStats({
            new: myTickets.filter(t => t.status === 'New').length,
            open: myTickets.filter(t => t.status === 'Open').length,
            inProgress: myTickets.filter(t => t.status === 'In Progress').length,
            resolved: myTickets.filter(t => t.status === 'Resolved').length,
          });
        }
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    };

    fetchTickets();
  }, [navigate]);

  const displayedTickets = tickets
    .filter(ticket => {
      if (filterStatus === 'All') {
        return true;
      }
      return ticket.status === filterStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'Priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case 'Newest':
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });
  return (
     <div class="container">
      
        <div class="sidebar">
            <div class="logo">Office Personel</div>
            <div class="nav-menu">
                <Link to="/user-dash" class="nav-item active" data-page="dashboard">Dashboard</Link>
                <Link to="/my-tickets" class="nav-item" data-page="my-tickets">My Tickets</Link>
                <Link to="/create-ticket" class="nav-item" data-page="create-ticket">Create Ticket</Link>
                <Link to="*" class="nav-item" data-page="agent-dash">Logout</Link>
            </div>
        </div>
        
        <div class="main-content">
            <div id="dashboard" class="page active">
                <div class="header">
                    <h1 class="page-title">Tickets Dashboard</h1>
                    </div>
                </div>

                <div class="stats-container">
                    <div class="stat-card">
                        <div class="stat-label">New</div>
                        <div class="stat-value">{stats.new}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Open</div>
                        <div class="stat-value">{stats.open}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">In Progress</div>
                        <div class="stat-value">{stats.inProgress}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Resolved</div>
                        <div class="stat-value">{stats.resolved}</div>
                    </div>
                </div>

                <div class="filters">
                    <div class="filter-group">
                        <select class="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="All">Status: All</option>
                            <option value="New">New</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                        <select class="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="Newest">Sort by: Newest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Priority">Priority</option>
                        </select>
                    </div>
                </div>
                <div class="ticket-list">
                    <div class="ticket-header">
                        <span>TICKET ID</span>
                        <span>SUBJECT</span>
                        <span>ASSIGNED AGENT</span>
                        <span>STATUS</span>
                        <span>PRIORITY</span>
                        <span>LAST UPDATED</span>
                    </div>
                    {displayedTickets.slice(0, 5).map(ticket => (
                        <div class="ticket-item" key={ticket._id}>
                            <span class="ticket-id">#{String(ticket._id).slice(-6)}</span>
                            <span>{ticket.title}</span>
                            <span class="ticket-assignee">
                                {ticket.agent?.full_name || 'Unassigned'}
                            </span>
                            <span>
                                <span className={`ticket-status status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                                    {ticket.status}
                                </span>
                            </span>
                            <span className={`priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
                            <span>{new Date(ticket.updated_at).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
        </div>
    </div> 
                
  );
};

export default Dashboard;
