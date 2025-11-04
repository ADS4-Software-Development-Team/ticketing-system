import jwt from 'jsonwebtoken';
import { supabase } from '../config/db.js';

export const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const { data: user, error } = await supabase.from('users').select('*').eq('_id', decoded.id).single();

            if (error || !user) {
                return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
            }

            // Attach user to the request object (excluding password)
            const { password, ...userWithoutPassword } = user;
            req.user = userWithoutPassword;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (req.user && (req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Not authorized as an admin' });
    }
};