import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

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
                        <div class="stat-label">New Tickets</div>
                        <div class="stat-value">12</div>
                        <div class="stat-change positive">+3% from yesterday</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Open</div>
                        <div class="stat-value">45</div>
                        <div class="stat-change negative">-1% from yesterday</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Pending</div>
                        <div class="stat-value">8</div>
                        <div class="stat-change negative">-5% from yesterday</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Resolved Today</div>
                        <div class="stat-value">21</div>
                        <div class="stat-change positive">+10% from yesterday</div>
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
                    <div class="ticket-item">
                        <span class="ticket-id">#89234</span>
                        <span>Cannot connect to VPN</span>
                        
                        <span class="ticket-assignee">
                            
                            Bob Williams
                        </span>
                        <span><span class="ticket-status status-in-progress">In Progress</span></span>
                        <span class="priority-high">High</span>
                        <span>2 mins ago</span>
                    </div>
                    <div class="ticket-item">
                        <span class="ticket-id">#89233</span>
                        <span>Printer not working on 2nd floor</span>
                        
                        <span class="ticket-assignee">
                            
                            David Garcia
                        </span>
                        <span><span class="ticket-status status-open">Open</span></span>
                        <span class="priority-medium">Medium</span>
                        <span>15 mins ago</span>
                    </div>
                    <div class="ticket-item">
                        <span class="ticket-id">#89232</span>
                        <span>Software license renewal request</span>
                       
                        <span class="ticket-assignee">
                            
                            Carol Miller
                        </span>
                        <span><span class="ticket-status status-resolved">Resolved</span></span>
                        <span class="priority-low">Low</span>
                        <span>1 hour ago</span>
                    </div>
                    <div class="ticket-item">
                        <span class="ticket-id">#89231</span>
                        <span>Access denied to shared drive</span>
                        <span class="ticket-assignee">
                            Bob Williams
                        </span>
                        <span><span class="ticket-status status-open">Open</span></span>
                        <span class="priority-medium">Medium</span>
                        <span>3 hours ago</span>
                    </div>
                    <div class="ticket-item">
                        <span class="ticket-id">#89230</span>
                        <span>Forgot my password again</span>
                        <span class="ticket-assignee">
                            Unassigned
                        </span>
                        <span><span class="ticket-status status-open">Open</span></span>
                        <span class="priority-low">Low</span>
                        <span>5 hours ago</span>
                    </div>
                </div>
        </div>
    </div> 
                
  );
};

export default Dashboard;
