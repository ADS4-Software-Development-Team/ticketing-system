import { supabase } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid'; // to generate unique IDs

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { full_name, email, password, user_type } = req.body;

        // Validate input
        if (!full_name || !email || !password || !user_type) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    _id: uuidv4(),
                    full_name,
                    email,
                    password,      // Note: For production, hash the password
                    role: user_type,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ])
            .select(); // return inserted row

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(201).json({ success: true, user: data[0] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.json({ success: true, users: data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


// You can later add more functions:
// export const getUsers = async (req, res) => { ... }
// export const updateUser = async (req, res) => { ... }
// export const deleteUser = async (req, res) => { ... }
