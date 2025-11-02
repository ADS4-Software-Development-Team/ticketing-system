import { supabase } from "../config/db.js";

export const createTicket = async (req, res) => {
  try {
    const { user_id, title, description, category, priority, status } = req.body;

    // Insert into Supabase tickets table
    const { data, error } = await supabase
      .from("tickets")
      .insert([
        {
          user_id,
          assigned_to: null,
          title,
          description,
          category: category || "General",
          priority: priority || "Medium",
          status: status || "Open",
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "✅ Ticket created successfully!",
      ticket: data[0],
    });
  } catch (err) {
    console.error("❌ Error creating ticket:", err.message);
    res.status(500).json({ error: err.message });
  }
};
