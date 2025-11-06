import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Import the centralized API instance

const CreateTicket = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [attachments, setAttachments] = useState([]);
  const [userName, setUserName] = useState('Office Personnel');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.full_name) {
      setUserName(user.full_name);
    }
  }, []);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a ticket.');
      navigate('/login');
      return;
    }

    // Basic validation
    if (!subject || !category || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    const ticketData = {
      title: subject,
      description,
      category,
      priority,
    };

    try {
      const response = await api.post('/tickets', ticketData);

      if (response.data.success) {
        alert('Ticket created successfully!');
        navigate('/my-tickets');
      }
    } catch (error) {
      console.error('Failed to create ticket:', error.response?.data?.message || error.message);
      alert(`Error: ${error.response?.data?.message || 'Could not create ticket.'}`);
    }
  };

  return (
    < div class="container">
        <div class="sidebar">
            <div class="logo">{userName}</div>
            <div class="nav-menu">
                <Link to="/user-dash" class="nav-item " data-page="dashboard">Dashboard</Link>
                <Link to="/my-tickets" class="nav-item" data-page="my-tickets">My Tickets</Link>
                <Link to="/create-ticket" class="nav-item active" data-page="create-ticket">Create Ticket</Link>
                <Link to="*" class="nav-item" data-page="agent-dash">Logout</Link>
            </div>
        </div>
        <div class="main-content">
     <div id="create-ticket" class="page">
                <div class="header">
                    <h1 class="page-title">Submit a New IT Support Ticket</h1>
                    
                </div>
                 
       <p ><i class="text-align-center">Please provide as much detail as possible so we can resolve your issue quickly.</i></p>
                <div class="form-container">
                  <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label class="form-label" htmlFor="subject">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          className="form-control"
                          placeholder="e.g., Cannot connect to VPN"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label" htmlFor="category">Category</label>
                        <select 
                          id="category" 
                          className="form-control"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="Hardware">Hardware</option>
                          <option value="Software">Software</option>
                          <option value="Network">Network</option>
                          <option value="Other">Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" htmlFor="description">Describe the Issue</label>
                        <textarea id="description" className="form-control" rows="5" placeholder="Please provide a detailed description of the problem you are experiencing. Include any error messages and steps to reproduce." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Priority</label>
                        <div class="urgency-options">
                            <div className={`urgency-option ${priority === 'Low' ? 'selected' : ''}`} onClick={() => setPriority('Low')}>
                                <h3>Low</h3>
                                <p>Minor issue, no immediate impact</p>
                            </div>
                            <div className={`urgency-option ${priority === 'Medium' ? 'selected' : ''}`} onClick={() => setPriority('Medium')}>
                                <h3>Medium</h3>
                                <p>Moderate impact on work</p>
                            </div>
                            <div className={`urgency-option ${priority === 'High' ? 'selected' : ''}`} onClick={() => setPriority('High')}>
                                <h3>High</h3>
                                <p>Critical issue, work is blocked</p>
                            </div>
                        </div>
                    </div>

                    {/* File upload is not fully implemented in this step */}
                    <div class="form-group">
                        <label class="form-label">Attachments</label>
                        <div class="file-upload">
                            <p>Drag & drop files here or click to browse</p>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => navigate('/user-dash')}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Submit Ticket</button>
                    </div>
                  </form>
                </div>
            </div>
    </div>
    </div>
  );
};

export default CreateTicket;
