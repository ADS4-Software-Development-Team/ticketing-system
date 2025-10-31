import { supabase } from '../config/db.js'

// Get logs for a ticket
export const getLogsByTicket = async (ticket_id) => {
  const { data, error } = await supabase.from('ticket_logs').select('*').eq('ticket_id', ticket_id)
  if (error) throw new Error(error.message)
  return data
}

// Add new ticket log
export const addTicketLog = async (logData) => {
  const { data, error } = await supabase.from('ticket_logs').insert([logData]).select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Update a log entry
export const updateTicketLog = async (id, updates) => {
  const { data, error } = await supabase.from('ticket_logs').update(updates).eq('_id', id).select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Delete a log entry
export const deleteTicketLog = async (id) => {
  const { error } = await supabase.from('ticket_logs').delete().eq('_id', id)
  if (error) throw new Error(error.message)
  return true
}
