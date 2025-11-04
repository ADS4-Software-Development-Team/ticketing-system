import { supabase } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

/**
 * @desc    Get all users for testing
 * @route   GET /api/test/users
 * @access  Public
 */
export const getTestUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('full_name, email, role, created_at');

        if (error) throw error;

        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (err) {
        console.error('Test GET Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error during test GET' });
    }
};

/**
 * @desc    Create a test user
 * @route   POST /api/test/users
 * @access  Public
 */
export const createTestUser = async (req, res) => {
    try {
        const { full_name, email, password, role = 'normal_user' } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide full_name, email, and password in the request body.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await supabase.from('users').insert([{ full_name, email, password: hashedPassword, role }]).select();

        if (error) {
            // Handle unique constraint violation for email
            if (error.code === '23505') {
                return res.status(409).json({ success: false, message: 'User with this email already exists.' });
            }
            throw error;
        }

        res.status(201).json({ success: true, message: 'Test user created successfully', user: data[0] });
    } catch (err) {
        console.error('Test POST Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error during test POST' });
    }
};

/**
 * @desc    Generate a bcrypt hash for a password
 * @route   POST /api/test/hash-password
 * @access  Public
 */
export const hashPassword = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: 'Please provide a password in the request body.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        res.status(200).json({
            success: true,
            originalPassword: password,
            hashedPassword: hashedPassword
        });
    } catch (err) {
        console.error('Password Hashing Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error during password hashing' });
    }
};