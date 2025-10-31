import { supabase } from '../config/db.js'

// Get all login logs for a user
export const getLogsByUser = async (user_id) => {
  const { data, error } = await supabase.from('login_logs').select('*').eq('user_id', user_id)
  if (error) throw new Error(error.message)
  return data
}

// Record new login
export const addLoginLog = async (logData) => {
  const { data, error } = await supabase.from('login_logs').insert([logData]).select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Update logout time
export const updateLogoutTime = async (id, logout_time) => {
  const { data, error } = await supabase
    .from('login_logs')
    .update({ logout_time })
    .eq('_id', id)
    .select()
  if (error) throw new Error(error.message)
  return data[0]
}

// Delete a log
export const deleteLoginLog = async (id) => {
  const { error } = await supabase.from('login_logs').delete().eq('_id', id)
  if (error) throw new Error(error.message)
  return true
}
