import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Import the centralized API instance

const Dashboard = () => {
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
      if (!token) {
        alert('You must be logged in to view this page.');
        navigate('/login');
        return;
      }

      try {
        // Use the new api instance. The base URL and auth header are handled automatically.
        const response = await api.get('/tickets');
        if (response.data.success) {
          const userTickets = response.data.tickets;
          setTickets(userTickets);

          // Calculate stats
          setStats({
            new: userTickets.filter(t => t.status === 'New').length,
            open: userTickets.filter(t => t.status === 'Open').length,
            inProgress: userTickets.filter(t => t.status === 'In Progress').length,
            resolved: userTickets.filter(t => t.status === 'Resolved').length,
          });
        }
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    };

    fetchTickets();
  }, [navigate]);

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
                        <select class="filter-select">
                            <option>Status: All</option>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                        </select>
                        <select class="filter-select">
                            <option>Sort by: Newest</option>
                            <option>Oldest</option>
                            <option>Priority</option>
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
                    {tickets.slice(0, 5).map(ticket => (
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
