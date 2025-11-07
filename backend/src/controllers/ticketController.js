import { supabase } from "../config/db.js";


export const createTicket = async (req, res) => {
  try {
    // user_id should come from authenticated user (req.user) set by auth middleware
    const { title, description, category, priority, user_id: bodyUserId } = req.body;
    const user_id = req.user._id; // Correctly get the user ID from the authenticated user object.

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    // Insert into Supabase tickets table
    const { data, error } = await supabase
      .from("tickets")
      .insert([
        {
          user_id,
          title,
          description,
          category: category || "General",
          priority: priority || "Medium",
          status: "Open",
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, message: "Ticket created successfully!", ticket: data[0] });
  } catch (err) {
    console.error("Error creating ticket:", err.message);
    res.status(500).json({ success: false, message: 'Server error while creating ticket' });
  }
};

// Get all tickets
export const getTickets = async (req, res) => {
  try {
    // We can add filtering/sorting/pagination later
    const { data, error } = await supabase.from('tickets').select(`
      *,
      user:users!tickets_user_id_fkey ( full_name, email ),
      agent:users!tickets_assigned_to_fkey ( full_name, email )
    `);

    if (error) throw error;

    res.json({ success: true, tickets: data });
  } catch (err) {
    console.error("Error fetching tickets:", err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching tickets' });
  }
};

// Get a single ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('tickets').select(`
      *,
      user:users!tickets_user_id_fkey ( full_name, email ),
      agent:users!tickets_assigned_to_fkey ( full_name, email )
    `).eq('_id', id).single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.json({ success: true, ticket: data });
  } catch (err) {
    console.error("Error fetching ticket:", err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching ticket' });
  }
};

// Update a ticket
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, priority, status, assigned_to } = req.body;

    const { data, error } = await supabase.from('tickets').update({ title, description, category, priority, status, assigned_to, updated_at: new Date() }).eq('_id', id).select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'Ticket not found' });

    res.json({ success: true, message: 'Ticket updated successfully', ticket: data[0] });
  } catch (err) {
    console.error("Error updating ticket:", err.message);
    res.status(500).json({ success: false, message: 'Server error while updating ticket' });
  }
};

// Delete a ticket
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('tickets').delete().eq('_id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (err) {
    console.error("Error deleting ticket:", err.message);
    res.status(500).json({ success: false, message: 'Server error while deleting ticket' });
  }
};
