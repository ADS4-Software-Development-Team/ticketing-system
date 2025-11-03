import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateTicket = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Medium');
  const [attachments, setAttachments] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log({
      subject,
      description,
      urgency,
      attachments
    });
  };

  return (
    < div class="container">
        <div class="sidebar">
            <div class="logo">Office Personel</div>
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
                    <div class="form-group">
                        <label class="form-label" for="subject">Category</label>
                        <input
                          type="text"
                      id="subject"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., Software, Hardware or Network"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
            />
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="description">Describe the Issue</label>
                        <textarea id="description" class="form-control" rows="5" placeholder="Please provide a detailed description of the problem you are experiencing. Include any error messages and steps to reproduce."></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Urgency</label>
                        <div class="urgency-options">
                            <div class="urgency-option" data-value="low">
                                <h3>Low</h3>
                                <p>Minor issue, no immediate impact</p>
                            </div>
                            <div class="urgency-option selected" data-value="medium">
                                <h3>Medium</h3>
                                <p>Moderate impact on work</p>
                            </div>
                            <div class="urgency-option" data-value="high">
                                <h3>High</h3>
                                <p>Critical issue, work is blocked</p>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Attachments</label>
                        <div class="file-upload">
                            <p>Drag & drop files here or click to browse</p>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button class="btn btn-outline">Cancel</button>
                        <button class="btn btn-primary">Submit Ticket</button>
                    </div>
                </div>
            </div>
    </div>
    </div>
  );
};

export default CreateTicket;
