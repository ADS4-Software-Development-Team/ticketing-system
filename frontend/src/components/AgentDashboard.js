import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgentDashboard = () => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [currentAgent, setCurrentAgent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!token || !user) {
            alert('Authentication error. Please log in.');
            navigate('/login');
            return;
        }

        setCurrentAgent({
            id: user._id,
            name: user.full_name,
            role: 'Support Agent',
            avatar: user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
        });

        const fetchTickets = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get('http://localhost:3000/api/tickets', config);
                if (response.data.success) {
                    const formattedTickets = response.data.tickets.map(ticket => ({
                        id: ticket._id,
                        subject: ticket.title,
                        requester: ticket.user?.full_name || 'N/A',
                        category: ticket.category,
                        priority: ticket.priority,
                        status: ticket.status,
                        assignedAgent: ticket.agent?.full_name || 'Unassigned',
                        createdAt: ticket.created_at,
                        updatedAt: ticket.updated_at,
                        description: ticket.description,
                        attachments: [], // Placeholder
                        conversation: [], // Placeholder
                    }));
                    setTickets(formattedTickets);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
                alert('Failed to fetch tickets.');
            }
        };

        fetchTickets();
    }, [navigate]);

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket);
        setShowTicketModal(true);
    };

    const handleStatusChange = async (ticketId, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(
                `http://localhost:3000/api/tickets/${ticketId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                const updatedTicket = response.data.ticket;
                const newTickets = tickets.map(t =>
                    t.id === ticketId ? { ...t, status: updatedTicket.status, updatedAt: updatedTicket.updated_at } : t
                );
                setTickets(newTickets);
                if (selectedTicket && selectedTicket.id === ticketId) {
                    setSelectedTicket({ ...selectedTicket, status: newStatus });
                }
                alert('Ticket status updated!');
            }
        } catch (error) {
            console.error('Error updating ticket status:', error);
            alert('Failed to update ticket status.');
        }
    };

  const handleReplySubmit = () => {
    if (!replyText.trim() || !selectedTicket) return

    const newMessage = {
      sender: `${currentAgent?.name} (Agent)`,
      message: replyText,
      time: 'Just now'
    }

    const updatedTicket = {
      ...selectedTicket,
      conversation: [...selectedTicket.conversation, newMessage],
      updatedAt: 'Just now'
    }

    setSelectedTicket(updatedTicket)
    setTickets(tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    ))
    setReplyText('')
  }

  const closeModal = () => {
    setShowTicketModal(false)
    setSelectedTicket(null)
    setReplyText('')
  }

  const openTickets = tickets.filter(ticket => ticket.status !== 'Resolved')
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'Resolved')

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (!currentAgent) {
    return <div className="container">Loading agent dashboard...</div>;
  }

  return (
    <div className="container">
      <div className="sidebar">
        {/* Agent Profile Section at the Top */}
        <div className="agent-header">
          <div className="agent-avatar-large">{currentAgent?.avatar}</div>
          <div className="agent-info">
            <div className="agent-name">{currentAgent.name}</div>
            <div className="agent-role">{currentAgent.role}</div>
          </div>
        </div>
        
        <div className="nav-menu">
          <a href="#" className="nav-item active">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </a>
          <a href="/login" className="nav-item" onClick={() => localStorage.clear()}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </a>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Support Agent Dashboard</h1>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-label">Total Tickets</div>
            <div className="stat-value">{tickets.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Open</div>
            <div className="stat-value">{openTickets.filter(t => t.status === 'Open').length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">In Progress</div>
            <div className="stat-value">{tickets.filter(t => t.status === 'In Progress').length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Resolved</div>
            <div className="stat-value">{resolvedTickets.length}</div>
          </div>
        </div>

        <h2 style={{margin: '20px 0 10px 0', color: 'var(--dark)'}}>Active Tickets</h2>
        <div className="ticket-list">
          <div className="ticket-header">
            <span>TICKET ID</span>
            <span>DATE</span>
            <span>SUBJECT</span>
            <span>CATEGORY</span>
            <span>ASSIGNED AGENT</span>
            <span>LAST REPLY</span>
            <span>STATUS</span>
          </div>
          {openTickets.map(ticket => (
            <div key={ticket.id} className="ticket-item" onClick={() => handleTicketClick(ticket)}>
              <span className="ticket-id">#{ticket.id}</span>
              <span>{formatDate(ticket.createdAt)}</span>
              <span>{ticket.subject}</span>
              <span>{ticket.category}</span>
              <span className="assigned-agent">
                {ticket.assignedAgent}
              </span>
              <span>
                {ticket.conversation.length > 0 
                  ? ticket.conversation[ticket.conversation.length - 1].sender
                  : 'No replies'
                }
              </span>
              <span>
                <span className={`ticket-status status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                  {ticket.status}
                </span>
              </span>
            </div>
          ))}
        </div>

        <h2 style={{margin: '30px 0 10px 0', color: 'var(--dark)'}}>Resolved Tickets</h2>
        <div className="ticket-list">
          <div className="ticket-header">
            <span>TICKET ID</span>
            <span>DATE</span>
            <span>SUBJECT</span>
            <span>CATEGORY</span>
            <span>ASSIGNED AGENT</span>
            <span>LAST REPLY</span>
            <span>STATUS</span>
          </div>
          {resolvedTickets.map(ticket => (
            <div key={ticket.id} className="ticket-item" onClick={() => handleTicketClick(ticket)}>
              <span className="ticket-id">#{ticket.id}</span>
              <span>{formatDate(ticket.createdAt)}</span>
              <span>{ticket.subject}</span>
              <span>{ticket.category}</span>
              <span className="assigned-agent">
                {ticket.assignedAgent}
              </span>
              <span>
                {ticket.conversation.length > 0 
                  ? ticket.conversation[ticket.conversation.length - 1].sender
                  : 'No replies'
                }
              </span>
              <span>
                <span className="ticket-status status-resolved">
                  {ticket.status}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Ticket Modal */}
        {showTicketModal && selectedTicket && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Ticket #{selectedTicket.id}: {selectedTicket.subject}</h2>
                <button className="modal-close" onClick={closeModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="ticket-meta-grid">
                  <div className="meta-item">
                    <label>Requester:</label>
                    <span>{selectedTicket.requester}</span>
                  </div>
                  <div className="meta-item">
                    <label>Category:</label>
                    <span>{selectedTicket.category}</span>
                  </div>
                  <div className="meta-item">
                    <label>Priority:</label>
                    <span className={`priority-${selectedTicket.priority.toLowerCase()}`}>
                      {selectedTicket.priority}
                    </span>
                  </div>
                  <div className="meta-item">
                    <label>Assigned Agent:</label>
                    <span>{selectedTicket.assignedAgent}</span>
                  </div>
                  <div className="meta-item">
                    <label>Status:</label>
                    <select 
                      value={selectedTicket.status} 
                      onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="New">New</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <div className="ticket-description">
                  <h3>Issue Description</h3>
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

                <div className="conversation-section">
                  <h3>Conversation</h3>
                  <div className="conversation-messages">
                    {selectedTicket.conversation.map((msg, index) => (
                      <div key={index} className={`message ${msg.sender.includes('Agent') ? 'agent-message' : 'user-message'}`}>
                        <div className="message-header">
                          <strong>{msg.sender}</strong>
                          <span className="message-time">{msg.time}</span>
                        </div>
                        <div className="message-content">{msg.message}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="reply-section">
                  <h3>Reply to Ticket</h3>
                  <textarea 
                    className="reply-textarea" 
                    placeholder="Type your reply message here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows="4"
                  ></textarea>
                  <button className="btn btn-primary" onClick={handleReplySubmit}>
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AgentDashboard;
