import { supabase } from '../config/db.js'

// Get all tickets
export const getAllTickets = async () => {
  const { data, error } = await supabase.from('tickets').select('*')
  if (error) throw new Error(error.message)
  return data
}

// Get ticket by ID
export const getTicketById = async (id) => {
  const { data, error } = await supabase.from('tickets').select('*').eq('_id', id).single()
  if (error) throw new Error(error.message)
  return data
}

// Create new ticket
export const createTicket = async (ticketData) => {
  const { data, error } = await supabase.from('tickets').insert([ticketData]).select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Update ticket
export const updateTicket = async (id, updates) => {
  const { data, error } = await supabase.from('tickets').update(updates).eq('_id', id).select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Delete ticket
export const deleteTicket = async (id) => {
  const { error } = await supabase.from('tickets').delete().eq('_id', id)
  if (error) throw new Error(error.message)
  return true
}
