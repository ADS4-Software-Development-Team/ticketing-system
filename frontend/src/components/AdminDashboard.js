import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
        user_type: 'agent',
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

    // Tickets State with categories and updatedAt
    const [tickets, setTickets] = useState([
        {
            id: 1,
            title: 'Login Issue',
            assignedTo: 'Sarah Wilson',
            status: 'Open',
            priority: 'High',
            createdBy: 'John Doe',
            createdAt: '2025-10-28 10:15 AM',
            category: 'Software',
            updatedAt: '2025-10-28 10:15 AM'
        },
        {
            id: 2,
            title: 'Page not loading',
            assignedTo: 'John Doe',
            status: 'In Progress',
            priority: 'Medium',
            createdBy: 'Mike Johnson',
            createdAt: '2025-10-28 11:30 AM',
            category: 'Network',
            updatedAt: '2025-10-28 02:45 PM'
        },
        {
            id: 3,
            title: 'Bug in checkout',
            assignedTo: 'Mike Johnson',
            status: 'Resolved',
            priority: 'Low',
            createdBy: 'Sarah Wilson',
            createdAt: '2025-10-27 02:45 PM',
            category: 'Software',
            updatedAt: '2025-10-28 09:30 AM'
        },
        {
            id: 4,
            title: 'Password reset',
            assignedTo: 'Sarah Wilson',
            status: 'Open',
            priority: 'High',
            createdBy: 'John Doe',
            createdAt: '2025-10-28 09:00 AM',
            category: 'Software',
            updatedAt: '2025-10-28 09:00 AM'
        },
        {
            id: 5,
            title: 'Printer not working',
            assignedTo: 'Mike Johnson',
            status: 'Open',
            priority: 'Medium',
            createdBy: 'John Doe',
            createdAt: '2025-10-29 08:30 AM',
            category: 'Hardware',
            updatedAt: '2025-10-29 08:30 AM'
        },
    ]);

    // Menu Items with reduced spacing
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

    // Category Stats
    const categoryStats = [
        { label: 'Software', value: tickets.filter(t => t.category === 'Software').length, color: 'bg-blue-500' },
        { label: 'Network', value: tickets.filter(t => t.category === 'Network').length, color: 'bg-green-500' },
        { label: 'Hardware', value: tickets.filter(t => t.category === 'Hardware').length, color: 'bg-orange-500' },
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
        { label: 'Add Agent', icon: '➕', action: () => handleAddUserClick() },
        { label: 'User Management', icon: '👥', action: () => setActiveSection('users') },
    ];

    // Calculate total tickets and percentages
    const totalTickets = tickets.length;
    const openCount = tickets.filter(t => t.status === 'Open').length;
    const closedCount = tickets.filter(t => t.status === 'Resolved').length;
    const progressCount = tickets.filter(t => t.status === 'In Progress').length;

    const openPercent = totalTickets > 0 ? ((openCount / totalTickets) * 100).toFixed(1) : '0.0';
    const closedPercent = totalTickets > 0 ? ((closedCount / totalTickets) * 100).toFixed(1) : '0.0';
    const progressPercent = totalTickets > 0 ? ((progressCount / totalTickets) * 100).toFixed(1) : '0.0';

    // Handlers
    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddUserClick = () => {
        setShowAddUserForm(true);
        setActiveSection('agents');
    };

    const handleLogout = () => {
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (confirmed) {
            navigate('/');
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            id: users.length + 1,
            full_name: formData.full_name,
            email: formData.email,
            user_type: 'agent',
            status: 'active',
        };
        setUsers(prev => [...prev, newUser]);
        setSuccessMessage('Support Agent created successfully!');
        setShowSuccessMessage(true);
        setFormData({ full_name: '', email: '', password: '', user_type: 'agent' });
        setTimeout(() => {
            setShowSuccessMessage(false);
            setShowAddUserForm(false);
        }, 5000);
    };

    const handleCancel = () => {
        setShowAddUserForm(false);
        setFormData({ full_name: '', email: '', password: '', user_type: 'agent' });
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

    // Custom label for pie chart with percentages
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                fontSize="12"
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(1)}%`}
            </text>
        );
    };

    // Render Content
    const renderContent = () => {
        if (showAddUserForm) {
            return (
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
                    <h2 className="text-2xl font-semibold mb-2">Add New Agent</h2>
                    {showSuccessMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-start">
                            <span className="mr-2">✅</span>
                            <div>
                                <h4 className="font-semibold">{successMessage}</h4>
                                <p>The new agent account has been added successfully.</p>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                Create Agent
                            </button>
                        </div>
                    </form>
                </div>
            );
        }

        // eslint-disable-next-line default-case
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

                        {/* Category Stats */}
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="font-semibold mb-3">Tickets by Category</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {categoryStats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border rounded">
                                        <div className="flex items-center">
                                            <div className={`w-4 h-4 rounded-full ${stat.color} mr-3`}></div>
                                            <span className="font-medium">{stat.label}</span>
                                        </div>
                                        <span className="text-lg font-semibold">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
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
                const chartData = [
                    { name: 'Open Tickets', value: openCount },
                    { name: 'In Progress', value: progressCount },
                    { name: 'Closed Tickets', value: closedCount },
                ];

                const COLORS = ['#f87171', '#facc15', '#4ade80'];

                return (
                    <div className="bg-white p-6 rounded shadow text-gray-700">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center">
                            📈 Ticket Analytics Overview
                        </h2>

                        {/* Chart Section */}
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                            <div className="w-full md:w-1/2">
                                <ResponsiveContainer width="100%" height={400}>
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={150}
                                            label={renderCustomizedLabel}
                                            labelLine={false}
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value, name) => [`${value} tickets`, name]}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Summary Details */}
                            <div className="space-y-4 text-gray-800">
                                <h3 className="text-lg font-semibold">Ticket Breakdown</h3>
                                <div className="flex items-center space-x-3">
                                    <span className="w-4 h-4 rounded-full bg-red-400"></span>
                                    <p>Open Tickets: <strong>{openCount}</strong> ({openPercent}%)</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
                                    <p>In Progress: <strong>{progressCount}</strong> ({progressPercent}%)</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="w-4 h-4 rounded-full bg-green-400"></span>
                                    <p>Closed Tickets: <strong>{closedCount}</strong> ({closedPercent}%)</p>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-gray-600">
                                        Total Tickets: <strong>{totalTickets}</strong>
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        This overview provides insight into current support workload and performance efficiency.
                                    </p>
                                </div>
                            </div>
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
                            {type === 'agent' && (
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleAddUserClick}>
                                    ➕ Add Agent
                                </button>
                            )}
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
                                        <th className="px-4 py-2 text-left text-gray-700">Category</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Assigned To</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Created By</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Created At</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Updated At</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Status</th>
                                        <th className="px-4 py-2 text-left text-gray-700">Priority</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tickets.map(ticket => (
                                        <tr key={ticket.id}>
                                            <td className="px-4 py-2">{ticket.id}</td>
                                            <td className="px-4 py-2">{ticket.title}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-white text-sm ${ticket.category === 'Software' ? 'bg-blue-500' :
                                                    ticket.category === 'Network' ? 'bg-green-500' :
                                                        'bg-orange-500'
                                                    }`}>
                                                    {ticket.category}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">{ticket.assignedTo}</td>
                                            <td className="px-4 py-2">{ticket.createdBy}</td>
                                            <td className="px-4 py-2">{ticket.createdAt}</td>
                                            <td className="px-4 py-2">{ticket.updatedAt}</td>
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
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Fixed Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-white shadow px-4 py-3">
                <div className="flex items-center space-x-4">
                   
                    <div>
                        <h1 className="font-bold text-xl">DekagoTicketFlow</h1>
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
            <div className="flex flex-1 overflow-hidden mt-16">
                {/* Sidebar with reduced spacing */}
                <aside className={`bg-gray-100 w-64 pr-4 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <nav className="flex flex-col space-y-1"> {/* Reduced from space-y-2 to space-y-1 */}
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                className={`flex items-center px-3 py-2 rounded hover:bg-gray-200 ${activeSection === item.id ? 'bg-blue-300 font-semibold' : ''}`}
                                onClick={() => {
                                    if (item.id === 'logout') {
                                        handleLogout();
                                    } else {
                                        setActiveSection(item.id);
                                        setShowAddUserForm(false);
                                        setShowSuccessMessage(false);
                                    }
                                }}
                            >
                                <span className="mr-2 text-lg">{item.icon}</span>
                                <span className="text-sm">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-6 bg-gray-50 pb-16">
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