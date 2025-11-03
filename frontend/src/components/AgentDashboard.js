import { useState } from 'react'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [replyText, setReplyText] = useState('')
  
  // Current logged-in agent
  const [currentAgent] = useState({
    name: 'Jane Smith',
    role: 'Support Agent',
    avatar: 'JS'
  })

  const [tickets, setTickets] = useState([
    {
      id: 'IT-12345',
      subject: 'Cannot connect to network printer',
      requester: 'Alex Doe',
      category: 'Hardware',
      priority: 'High',
      status: 'New',
      assignedAgent: 'Unassigned',
      createdAt: '2024-01-15',
      updatedAt: '1 hour ago',
      description: 'Hello, I am unable to connect to the network printer on the 3rd floor. My computer cannot find it, and I have a deadline to print important documents.',
      attachments: ['printer_setup.pdf'],
      conversation: [
        { sender: 'Alex Doe', message: 'Hello, I am unable to connect to the network printer on the 3rd floor. My computer cannot find it, and I have a deadline to print important documents.', time: '2 days ago' }
      ]
    },
    {
      id: 'IT-12346',
      subject: 'VPN connection issues',
      requester: 'John Smith',
      category: 'Networking',
      priority: 'High',
      status: 'In Progress',
      assignedAgent: 'Jane Smith',
      createdAt: '2024-01-16',
      updatedAt: '5 minutes ago',
      description: 'Unable to connect to company VPN from home office. Getting authentication error.',
      attachments: ['vpn_error.png'],
      conversation: [
        { sender: 'John Smith', message: 'Unable to connect to company VPN from home office. Getting authentication error.', time: '1 day ago' },
        { sender: 'Jane Smith (Agent)', message: 'Looking into your VPN configuration. Please check if your certificate is up to date.', time: '5 minutes ago' }
      ]
    },
    {
      id: 'IT-12347',
      subject: 'Software installation request',
      requester: 'Sarah Wilson',
      category: 'Software',
      priority: 'Medium',
      status: 'Open',
      assignedAgent: 'Mike Johnson',
      createdAt: '2024-01-17',
      updatedAt: '3 hours ago',
      description: 'Need Adobe Creative Suite installed for marketing department projects.',
      attachments: [],
      conversation: [
        { sender: 'Sarah Wilson', message: 'Need Adobe Creative Suite installed for marketing department projects.', time: '3 hours ago' }
      ]
    },
    {
      id: 'IT-12344',
      subject: 'Email configuration',
      requester: 'Mike Johnson',
      category: 'Email',
      priority: 'Low',
      status: 'Resolved',
      assignedAgent: 'Jane Smith',
      createdAt: '2024-01-12',
      updatedAt: '2 days ago',
      description: 'Need help setting up email on new mobile device.',
      attachments: [],
      conversation: [
        { sender: 'Mike Johnson', message: 'Need help setting up email on new mobile device.', time: '5 days ago' },
        { sender: 'Jane Smith (Agent)', message: 'Email configuration completed successfully. You should now be able to access your emails.', time: '2 days ago' }
      ]
    }
  ])

  const handleTicketClick = (ticket) => {
    // Update status to "Open" and assign current agent when agent clicks on a ticket
    const updatedTickets = tickets.map(t => 
      t.id === ticket.id ? { 
        ...t, 
        status: t.status === 'New' ? 'Open' : t.status,
        assignedAgent: t.assignedAgent === 'Unassigned' ? currentAgent.name : t.assignedAgent
      } : t
    )
    setTickets(updatedTickets)
    
    const updatedTicket = updatedTickets.find(t => t.id === ticket.id)
    setSelectedTicket(updatedTicket)
    setShowTicketModal(true)
  }

  const handleStatusChange = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    )
    setTickets(updatedTickets)
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus })
    }
  }

  const handleReplySubmit = () => {
    if (!replyText.trim() || !selectedTicket) return

    const newMessage = {
      sender: `${currentAgent.name} (Agent)`,
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

  return (
    <div className="container">
      <div className="sidebar">
        {/* Agent Profile Section at the Top */}
        <div className="agent-header">
          <div className="agent-avatar-large">{currentAgent.avatar}</div>
          <div className="agent-info">
            <div className="agent-name">{currentAgent.name}</div>
            <div className="agent-role">{currentAgent.role}</div>
          </div>
        </div>
        
        <div className="nav-menu">
          <a href="#" className="nav-item active">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </a>
          <a href="/login" className="nav-item">
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

export default App
