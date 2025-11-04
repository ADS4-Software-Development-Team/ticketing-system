// Authentication logic
import { supabase } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Register a new user
export const register = async (req, res) => {
    try {
        const { full_name, email, password, user_type = 'normal_user' } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide full name, email, and password' });
        }

        // Check if user already exists
        const { data: existingUser, error: existingUserError } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .maybeSingle();

        if (existingUserError && existingUserError.code !== 'PGRST116') { // PGRST116: "exact one row not found" is ok
            throw existingUserError;
        }

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User with this email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const { data, error } = await supabase
            .from('users')
            .insert([{
                full_name,
                email,
                password: hashedPassword,
                role: user_type,
            }])
            .select('*, role');

        if (error) throw error;

        res.status(201).json({ success: true, message: 'User registered successfully', user: data[0] });

    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const { data: user, error } = await supabase.from('users').select('*').eq('email', email).single();

        if (error || !user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Omit password from the response
        const { password: _, ...userWithoutPassword } = user;

        res.json({ success: true, token, user: userWithoutPassword });

    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};