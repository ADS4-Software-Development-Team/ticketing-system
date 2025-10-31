import { supabase } from '../config/db.js'

// Get all comments for a ticket
export const getCommentsByTicket = async (ticket_id) => {
  const { data, error } = await supabase.from('comments').select('*').eq('ticket_id', ticket_id)
  if (error) throw new Error(error.message)
  return data
}

// Add a comment
export const addComment = async (commentData) => {
  const { data, error } = await supabase.from('comments').insert([commentData]).select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Update a comment
export const updateComment = async (id, updates) => {
  const { data, error } = await supabase.from('comments').update(updates).eq('_id', id).select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Delete a comment
export const deleteComment = async (id) => {
  const { error } = await supabase.from('comments').delete().eq('_id', id)
  if (error) throw new Error(error.message)
  return true
}
