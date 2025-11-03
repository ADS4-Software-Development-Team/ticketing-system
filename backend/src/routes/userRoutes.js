import express from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../config/db.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { full_name, email, password, user_type } = req.body;

    // Map user_type from frontend to role in DB
    const role = user_type === 'agent' ? 'technician' : 'normal_user';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        { full_name, email, password: hashedPassword, role }
      ])
      .select(); // Return the inserted row

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(400).json({ success: false, message: error.message });
    }

    res.json({ success: true, user: data[0] });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
