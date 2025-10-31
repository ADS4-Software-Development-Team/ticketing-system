import { supabase } from '../config/db.js'

// Get all attachments for a ticket
export const getAttachmentsByTicket = async (ticket_id) => {
  const { data, error } = await supabase.from('attachments').select('*').eq('ticket_id', ticket_id)
  if (error) throw new Error(error.message)
  return data
}

// Add attachment
export const addAttachment = async (attachmentData) => {
  const { data, error } = await supabase.from('attachments').insert([attachmentData]).select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Update attachment
export const updateAttachment = async (id, updates) => {
  const { data, error } = await supabase.from('attachments').update(updates).eq('_id', id).select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Delete attachment
export const deleteAttachment = async (id) => {
  const { error } = await supabase.from('attachments').delete().eq('_id', id)
  if (error) throw new Error(error.message)
  return true
}
