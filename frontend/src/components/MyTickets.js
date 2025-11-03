import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  // Sample tickets data with conversation history
  const [tickets, setTickets] = useState([
    {
      id: 'IT-12456',
      subject: 'Cannot connect to the office Wi-Fi',
      status: 'In Progress',
      priority: 'High',
      category: 'Networking',
      createdAt: '2024-01-15',
      updatedAt: '2 hours ago',
      assignedTo: 'Jane Doe',
      description: 'I am unable to connect to the office Wi-Fi on my laptop. The network appears in the list but when I try to connect, it keeps asking for credentials and then fails.',
      attachments: ['wifi_error.png'],
      conversation: [
        {
          sender: 'You',
          message: 'I am unable to connect to the office Wi-Fi on my laptop. The network appears in the list but when I try to connect, it keeps asking for credentials and then fails.',
          time: '2 days ago'
        },
        {
          sender: 'Jane Doe (Support Agent)',
          message: 'Thanks for reporting this issue. I can see your device is having authentication problems. Can you try forgetting the network and reconnecting? Also, make sure you\'re using the correct domain credentials.',
          time: '1 day ago'
        },
        {
          sender: 'You',
          message: 'I tried forgetting the network and reconnecting, but I\'m still having the same issue. I\'m using the same credentials that work on my other devices.',
          time: '5 hours ago'
        },
        {
          sender: 'Jane Doe (Support Agent)',
          message: 'I\'ve reset your network profile on our end. Please try connecting again. If it still doesn\'t work, I\'ll need to check your device settings remotely.',
          time: '2 hours ago'
        }
      ]
    },
    {
      id: 'IT-12455',
      subject: 'Software installation request for Figma',
      status: 'Open',
      priority: 'Medium',
      category: 'Software',
      createdAt: '2024-01-16',
      updatedAt: '1 day ago',
      assignedTo: 'John Smith',
      description: 'I need Figma installed on my computer for design collaboration with the marketing team. This is required for an upcoming project.',
      attachments: [],
      conversation: [
        {
          sender: 'You',
          message: 'I need Figma installed on my computer for design collaboration with the marketing team. This is required for an upcoming project.',
          time: '1 day ago'
        },
        {
          sender: 'John Smith (Support Agent)',
          message: 'I\'ve received your software request. I\'ll need approval from your manager before proceeding with the installation. Could you please have them approve the request in the system?',
          time: '1 day ago'
        }
      ]
    },
    {
      id: 'IT-12450',
      subject: 'Request for a new keyboard',
      status: 'Resolved',
      priority: 'Low',
      category: 'Hardware',
      createdAt: '2024-01-12',
      updatedAt: '3 days ago',
      assignedTo: 'Samantha Bee',
      description: 'My current keyboard has several keys that are not working properly, making it difficult to type efficiently.',
      attachments: ['keyboard_issue.jpg'],
      conversation: [
        {
          sender: 'You',
          message: 'My current keyboard has several keys that are not working properly, making it difficult to type efficiently.',
          time: '5 days ago'
        },
        {
          sender: 'Samantha Bee (Support Agent)',
          message: 'I\'ve processed your hardware request. A new keyboard has been ordered and will be delivered to your desk by tomorrow morning.',
          time: '4 days ago'
        },
        {
          sender: 'Samantha Bee (Support Agent)',
          message: 'The new keyboard has been delivered and installed. Please confirm if everything is working properly now.',
          time: '3 days ago'
        },
        {
          sender: 'You',
          message: 'Yes, the new keyboard is working perfectly. Thank you for the quick resolution!',
          time: '3 days ago'
        }
      ]
    }
  ]);

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
        
        {tickets.map(ticket => (
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
                  className={`message ${message.sender.includes('Support Agent') ? 'agent-message' : 'user-message'}`}
                >
                  <div className="message-header">
                    <strong>{message.sender}</strong>
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
