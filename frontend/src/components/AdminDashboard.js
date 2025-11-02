import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [adminName] = useState('Ayanda Mthethwa');
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        user_type: 'user',
    });
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({
        full_name: '',
        email: '',
        user_type: '',
        status: '',
    });
    const navigate = useNavigate();

    // Users State
    const [users, setUsers] = useState([
        { id: 1, full_name: 'John Doe', email: 'john@example.com', user_type: 'user', status: 'active' },
        { id: 2, full_name: 'Sarah Wilson', email: 'sarah@example.com', user_type: 'agent', status: 'active' },
        { id: 3, full_name: 'Mike Johnson', email: 'mike@example.com', user_type: 'user', status: 'inactive' },
    ]);

    // Tickets State
    const [tickets, setTickets] = useState([
        { id: 1, title: 'Login Issue', assignedTo: 'Sarah Wilson', status: 'Open', priority: 'High', createdBy: 'John Doe', createdAt: '2025-10-28 10:15 AM' },
        { id: 2, title: 'Page not loading', assignedTo: 'John Doe', status: 'In Progress', priority: 'Medium', createdBy: 'Mike Johnson', createdAt: '2025-10-28 11:30 AM' },
        { id: 3, title: 'Bug in checkout', assignedTo: 'Mike Johnson', status: 'Resolved', priority: 'Low', createdBy: 'Sarah Wilson', createdAt: '2025-10-27 02:45 PM' },
        { id: 4, title: 'Password reset', assignedTo: 'Sarah Wilson', status: 'Open', priority: 'High', createdBy: 'John Doe', createdAt: '2025-10-28 09:00 AM' },
    ]);

    // Menu Items
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'users', label: 'User Management', icon: '👥' },     
        { id: 'agents', label: 'Agent Management', icon: '🛠️' },
        { id: 'tickets', label: 'All Tickets', icon: '🎫' },
        { id: 'reports', label: 'Analytics', icon: '📈' },
        { id: 'logout', label: 'Logout', icon: '↩️' }
    ];

    // Dashboard Stats
    const stats = [
        { label: 'Total Tickets', value: tickets.length, icon: '🎫', color: 'bg-blue-600' },
        { label: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length, icon: '🔓', color: 'bg-red-500' },
        { label: 'Closed Tickets', value: tickets.filter(t => t.status === 'Resolved').length, icon: '✅', color: 'bg-green-500' },
        { label: 'Active Agents', value: users.filter(u => u.user_type === 'agent' && u.status === 'active').length, icon: '👨‍💼', color: 'bg-purple-500' },
    ];

    // Recent Activity
    const recentActivities = [
        { action: 'New ticket assigned', user: 'John Doe', time: '2 mins ago' },
        { action: 'Ticket resolved', user: 'Sarah Wilson', time: '15 mins ago' },
        { action: 'New agent added', user: 'System', time: '1 hour ago' },
        { action: 'Priority changed', user: 'Mike Johnson', time: '2 hours ago' },
    ];

    // Quick Actions
    const quickActions = [
        { label: 'Add User/Agent', icon: '➕', action: () => handleAddUserClick() },
        { label: 'System Settings', icon: '⚙️', action: () => setActiveSection('settings') },
        { label: 'User Management', icon: '👥', action: () => setActiveSection('users') },
    ];

    // Pie chart data
    const pieData = [
        { name: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length },
        { name: 'Closed Tickets', value: tickets.filter(t => t.status === 'Resolved').length },
    ];
    const COLORS = ['#FF4C4C', '#4CAF50'];

    // Handlers
    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddUserClick = () => {
        setShowAddUserForm(true);
        setActiveSection('users');
    };

    const handleLogout = () => {
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (confirmed) {
             navigate('/'); // ✅ Redirects to welcome page
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/api/users', formData);

        if (response.data.success) {
            setUsers(prev => [...prev, response.data.user]); // update frontend state
            setSuccessMessage(`${formData.user_type === 'agent' ? 'Support Agent' : 'User'} created successfully!`);
            setShowSuccessMessage(true);
            setFormData({ full_name: '', email: '', password: '', user_type: 'user' });
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowAddUserForm(false);
            }, 5000);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to create user. Please try again.');
    }
};

    const handleCancel = () => {
        setShowAddUserForm(false);
        setFormData({ full_name: '', email: '', password: '', user_type: 'user' });
        setShowSuccessMessage(false);
    };

    const handleDeleteUser = userId => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(prev => prev.filter(u => u.id !== userId));
        }
    };

    const handleToggleStatus = userId => {
        setUsers(prev =>
            prev.map(u => (u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u))
        );
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditFormData({
            full_name: user.full_name,
            email: user.email,
            user_type: user.user_type,
            status: user.status,
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === editingUser.id ? { ...u, ...editFormData } : u
            )
        );
        setEditingUser(null);
        setEditFormData({ full_name: '', email: '', user_type: '', status: '' });
        alert('User information updated successfully!');
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setEditFormData({ full_name: '', email: '', user_type: '', status: '' });
    };


    const getUsersByType = type => users.filter(u => u.user_type === type);

    // Render Content
    const renderContent = () => {
        if (showAddUserForm) {
            return (
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
                    <h2 className="text-2xl font-semibold mb-2">Add New User/Agent</h2>
                    {showSuccessMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-start">
                            <span className="mr-2">✅</span>
                            <div>
                                <h4 className="font-semibold">{successMessage}</h4>
                                <p>The new account has been added successfully.</p>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Account Type</label>
                            <select name="user_type" value={formData.user_type} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required>
                                <option value="user">User</option>
                                <option value="agent">Support Agent</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Full Name</label>
                            <input type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required minLength="6" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Create {formData.user_type === 'agent' ? 'Agent' : 'User'}
                            </button>
                        </div>
                    </form>
                </div>
            );
        }

        switch (activeSection) {
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {stats.map((stat, idx) => (
                                <div key={idx} className={`flex items-center p-4 bg-white rounded shadow`}>
                                    <div className={`text-white p-3 rounded-full ${stat.color} text-2xl mr-4`}>{stat.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{stat.value}</h3>
                                        <p className="text-gray-500">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity & Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2 bg-white p-4 rounded shadow">
                                <h3 className="font-semibold mb-3">Recent Activity</h3>
                                <div className="space-y-2">
                                    {recentActivities.map((act, idx) => (
                                        <div key={idx} className="flex items-start space-x-2">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                                            <div>
                                                <p className="text-gray-700"><strong>{act.action}</strong> by {act.user}</p>
                                                <small className="text-gray-400">{act.time}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded shadow space-y-4">
                                <h3 className="font-semibold">Quick Actions</h3>
                                <div className="flex flex-col space-y-2">
                                    {quickActions.map((qa, idx) => (
                                        <button key={idx} onClick={qa.action} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                            <span className="mr-2">{qa.icon}</span> {qa.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'reports':
                return (
                    <div className="bg-white p-6 rounded shadow text-gray-700">
                        <h2 className="text-xl font-semibold mb-4">{menuItems.find(i => i.id === 'reports')?.label}</h2>
                        <div className="flex justify-center items-center">
                            <PieChart width={400} height={400}>
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </div>
                    </div>
                );

            case 'users':
            case 'agents':
                const type = activeSection === 'agents' ? 'agent' : 'user';
                return (
                    <div className="bg-white p-4 rounded shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{type === 'agent' ? 'Support Agents' : 'Users'}</h2>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleAddUserClick}>
                                ➕ Add {type === 'agent' ? 'Agent' : 'User'}
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left text-gray-700">Name</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Email</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Status</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {getUsersByType(type).map(user => (
                                        <tr key={user.id}>
                                            {editingUser && editingUser.id === user.id ? (
                                                <>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="text"
                                                            name="full_name"
                                                            value={editFormData.full_name}
                                                            onChange={handleEditInputChange}
                                                            className="border rounded px-2 py-1 w-full"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={editFormData.email}
                                                            onChange={handleEditInputChange}
                                                            className="border rounded px-2 py-1 w-full"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <select
                                                            name="status"
                                                            value={editFormData.status}
                                                            onChange={handleEditInputChange}
                                                            className="border rounded px-2 py-1"
                                                        >
                                                            <option value="active">Active</option>
                                                            <option value="inactive">Inactive</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2 space-x-2">
                                                        <button
                                                            onClick={handleSaveEdit}
                                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-4 py-2">{user.full_name}</td>
                                                    <td className="px-4 py-2">{user.email}</td>
                                                    <td className="px-4 py-2">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-white text-sm ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                                                }`}
                                                        >
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 space-x-2">
                                                        <button
                                                            onClick={() => handleEditClick(user)}
                                                            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleStatus(user.id)}
                                                            className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                                        >
                                                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            {getUsersByType(type).length === 0 && <p className="text-gray-500 mt-2">No {type === 'agent' ? 'support agents' : 'users'} found.</p>}
                        </div>
                    </div>
                );

            case 'tickets':
                return (
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">All Tickets</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left text-gray-700">ID</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Title</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Assigned To</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Created By</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Created At</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Status</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Priority</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tickets.map(ticket => (
                                        <tr key={ticket.id}>
                                            <td className="px-4 py-2">{ticket.id}</td>
                                            <td className="px-4 py-2">{ticket.title}</td>
                                            <td className="px-4 py-2">{ticket.assignedTo}</td>
                                            <td className="px-4 py-2">{ticket.createdBy}</td>
                                            <td className="px-4 py-2">{ticket.createdAt}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-white text-sm ${ticket.status === 'Open' ? 'bg-red-500' : ticket.status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                                    {ticket.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">{ticket.priority}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="bg-white p-6 rounded shadow text-gray-700">
                        <h2 className="text-xl font-semibold mb-2">{menuItems.find(i => i.id === activeSection)?.label}</h2>
                        <p className="text-gray-500">Content for this section will appear here.</p>
                    </div>
                );

            default:
                return <div className="text-gray-700">Select a section</div>;
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Fixed Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-white shadow px-4 py-3">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">☰</button>
                    <div>
                        <h1 className="font-bold text-xl">TicketFlow</h1>
                        <span className="text-gray-500 text-sm">Admin Panel</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="font-medium">{adminName}</p>
                        <p className="text-sm text-gray-500">Administrator</p>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden mt-16"> {/* mt-16 to account for fixed header */}
                {/* Sidebar */}
                <aside className={`bg-gray-100 w-64 p-4 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <nav className="flex flex-col space-y-2">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                className={`flex items-center px-3 py-2 rounded hover:bg-gray-200 ${activeSection === item.id ? 'bg-gray-300 font-semibold' : ''}`}
                                onClick={() => {
                                    if (item.id === 'logout') {
                                        handleLogout(); // ✅ Logout confirmation
                                    } else {
                                        setActiveSection(item.id);
                                        setShowAddUserForm(false);
                                        setShowSuccessMessage(false);
                                    }
                                }}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-6 bg-gray-50 pb-16"> {/* pb-16 to account for fixed footer */}
                    {renderContent()}
                </main>
            </div>

            {/* Fixed Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white shadow px-4 py-3 text-sm text-gray-500 flex justify-between z-50">
                <span>© 2025 DekagoTicketFlow Admin Panel. All rights reserved.</span>
                <span>Version 2.1.0 | Server: Production</span>
            </footer>
        </div>
    );
};

export default AdminDashboard;