import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const MyTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to view your tickets.');
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await api.get('/tickets');
        if (response.data.success) {
          // Map backend data to the format your component expects
          const formattedTickets = response.data.tickets.map(ticket => ({
            id: ticket._id,
            subject: ticket.title,
            status: ticket.status,
            priority: ticket.priority,
            category: ticket.category,
            createdAt: ticket.created_at,
            updatedAt: new Date(ticket.updated_at).toLocaleString(),
            assignedTo: ticket.agent?.full_name || 'Unassigned',
            description: ticket.description,
            attachments: ticket.attachments || [],
            conversation: ticket.conversation || [],
          })).filter(ticket => ticket.user_id === user._id);
          setTickets(formattedTickets);
        }
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
        alert('Could not load your tickets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [navigate]);

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const closeModal = () => {
    setShowTicketModal(false);
    setSelectedTicket(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
   <div className="container">
  <div className="sidebar">
    <div className="logo">Office Personnel</div>
    <div className="nav-menu">
      <Link to="/user-dash" className="nav-item" data-page="dashboard">Dashboard</Link>
      <Link to="/my-tickets" className="nav-item active" data-page="my-tickets">My Tickets</Link>
      <Link to="/create-ticket" className="nav-item" data-page="create-ticket">Create Ticket</Link>
      <Link to="*" className="nav-item" data-page="agent-dash">Logout</Link>
    </div>
  </div>
  
  <div className="main-content">
    <div id="my-tickets" className="page">
      <div className="header">
        <h1 className="page-title">My Support Tickets</h1>
      </div>

      <div className="filters">
        <div className="filter-group">
          <select className="filter-select">
            <option>Status: All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select className="filter-select">
            <option>Sort by: Newest</option>
            <option>Oldest</option>
            <option>Priority</option>
          </select>
        </div>
      </div>

      <div className="ticket-list">
        <div className="ticket-header">
          <span>TICKET ID</span>
          <span>CATEGORY</span>
          <span>SUBJECT</span>
          <span>AGENT</span>
          <span>STATUS</span>
          <span>ACTIONS</span>
        </div>
        
        {loading ? <p style={{textAlign: 'center', padding: '20px'}}>Loading tickets...</p> : tickets.map(ticket => (
          <div key={ticket.id} className="ticket-item">
            <span className="ticket-id">#{ticket.id}</span>
            <span className="ticket-category">{ticket.category}</span>
            <span className="ticket-subject">{ticket.subject}</span>
            <span className="ticket-agent">{ticket.assignedTo}</span>
            <span>
              <span className={`ticket-status status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                {ticket.status}
              </span>
            </span>
            <span className="ticket-actions">
              <button 
                className="btn btn-primary" 
                onClick={() => handleViewTicket(ticket)}
              >
                View
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Ticket Details Modal */}
  {showTicketModal && selectedTicket && (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content ticket-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Ticket #{selectedTicket.id}: {selectedTicket.subject}</h2>
          <button className="modal-close" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="ticket-meta-grid">
            <div className="meta-item">
              <label>Status:</label>
              <span className={`ticket-status status-${selectedTicket.status.toLowerCase().replace(' ', '-')}`}>
                {selectedTicket.status}
              </span>
            </div>
            <div className="meta-item">
              <label>Priority:</label>
              <span className={`priority-${selectedTicket.priority.toLowerCase()}`}>
                {selectedTicket.priority}
              </span>
            </div>
            <div className="meta-item">
              <label>Category:</label>
              <span>{selectedTicket.category}</span>
            </div>
            <div className="meta-item">
              <label>Assigned To:</label>
              <span>{selectedTicket.assignedTo}</span>
            </div>
            <div className="meta-item">
              <label>Created:</label>
              <span>{formatDate(selectedTicket.createdAt)}</span>
            </div>
            <div className="meta-item">
              <label>Last Updated:</label>
              <span>{selectedTicket.updatedAt}</span>
            </div>
          </div>

          <div className="ticket-description-section">
            <h3>Issue Description</h3>
            <div className="description-content">
              <p>{selectedTicket.description}</p>
              
              {selectedTicket.attachments.length > 0 && (
                <div className="attachments-section">
                  <h4>Attachments:</h4>
                  <div className="file-list">
                    {selectedTicket.attachments.map((file, index) => (
                      <div key={index} className="file-item">
                        <i className="fas fa-paperclip"></i> {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="conversation-section">
            <h3>Conversation History</h3>
            <div className="conversation-messages">
              {selectedTicket.conversation.map((message, index) => (
                <div 
                  key={index}
                  className={`message ${message.sender_type === 'agent' ? 'agent-message' : 'user-message'}`}
                >
                  <div className="message-header">
                    <strong>{message.sender_name}</strong>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <div className="message-content">
                    {message.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default MyTickets;
