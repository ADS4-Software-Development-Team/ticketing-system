// Comment management logic
import { supabase } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

// Add a comment to a ticket
export const addComment = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { text } = req.body;
        const user_id = req.user.id; // from authMiddleware

        if (!text) {
            return res.status(400).json({ success: false, message: 'Comment text is required' });
        }

        const { data, error } = await supabase
            .from('comments')
            .insert([{ text, ticket_id: ticketId, user_id }])
            .select(`*, user:users (full_name, email, role)`);

        if (error) throw error;

        res.status(201).json({ success: true, message: 'Comment added', comment: data[0] });

    } catch (err) {
        console.error('Error adding comment:', err.message);
        res.status(500).json({ success: false, message: 'Server error while adding comment' });
    }
};

// Get all comments for a ticket
export const getCommentsByTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;

        const { data, error } = await supabase
            .from('comments')
            .select(`*, user:users (full_name, email, role)`)
            .eq('ticket_id', ticketId)
            .order('created_at', { ascending: true });

        if (error) throw error;

        res.json({ success: true, comments: data });

    } catch (err) {
        console.error('Error fetching comments:', err.message);
        res.status(500).json({ success: false, message: 'Server error while fetching comments' });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        // Optional: check if user is the owner of the comment or an admin

        const { error } = await supabase.from('comments').delete().eq('_id', commentId);

        if (error) throw error;

        res.json({ success: true, message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Error deleting comment:', err.message);
        res.status(500).json({ success: false, message: 'Server error while deleting comment' });
    }
};