import { supabase } from '../config/db.js';
import bcrypt from 'bcryptjs';

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { full_name, email, password, user_type } = req.body;

        //Validate input
        if (!full_name || !email || !password || !user_type) {
            return res.status(400).json({ success: false, message: 'Full name, email, password, and user type are required.' });
        }

        //Map user_type from frontend to a valid role in the DB
        const role = (user_type === 'agent' || user_type === 'technician') ? 'technician' : 'normal_user';
        if (user_type === 'admin') {
            return res.status(400).json({ success: false, message: 'Cannot create admin users through this endpoint.' });
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    full_name,
                    email,
                    password: hashedPassword,
                    role: role,
                }
            ])
            .select('*, role'); //return inserted row

        if (error) {
            if (error.code === '23505') { //Unique violation
                return res.status(409).json({ success: false, message: 'User with this email already exists.' });
            }
            throw error;
        }

        const { password: _, ...userWithoutPassword } = data[0];

        return res.status(201).json({ success: true, user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error while creating user' });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('*, role');

        if (error) {
            throw error;
        }

        // Omit passwords from the response
        const users = data.map(({ password, ...user }) => user);

        return res.json({ success: true, users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error while fetching users' });
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('users').select('*, role').eq('_id', id).single();

        if (error || !data) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { password, ...userWithoutPassword } = data;
        return res.json({ success: true, user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error while fetching user' });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, user_type, status } = req.body;

        const updateData = { updated_at: new Date() };
        if (full_name) updateData.full_name = full_name;
        if (email) updateData.email = email;
        if (status) updateData.status = status;
        if (user_type) updateData.role = user_type === 'agent' ? 'technician' : 'normal_user';

        const { data, error } = await supabase.from('users').update(updateData).eq('_id', id).select('*, role');

        if (error) throw error;
        if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'User not found' });

        const { password, ...userWithoutPassword } = data[0];
        return res.json({ success: true, message: 'User updated successfully', user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error while updating user' });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('users').delete().eq('_id', id).select();

        if (error) throw error;
        if (!data || data.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error while deleting user' });
    }
};
