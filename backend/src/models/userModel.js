import { supabase } from '../config/db.js'

/**
 * 🧱 USER MODEL
 * Handles CRUD operations for the "users" table.
 * Columns: _id, full_name, email, password, role, created_by, created_at, updated_at
 */

// ✅ Create a new user
export const createUser = async (userData) => {
  const { full_name, email, password, role, created_by } = userData
  const { data, error } = await supabase
    .from('users')
    .insert([{ full_name, email, password, role, created_by }])
    .select()
  if (error) throw new Error(error.message)
  return data[0]
}

// ✅ Get all users
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
  if (error) throw new Error(error.message)
  return data
}

// ✅ Get user by ID
export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('_id', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

// ✅ Update user
export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('_id', id)
    .select()
  if (error) throw new Error(error.message)
  return data[0]
}

// ✅ Delete user
export const deleteUser = async (id) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('_id', id)
  if (error) throw new Error(error.message)
  return { message: `User ${id} deleted successfully` }
}

// ✅ Find user by email (for login/auth)
export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  if (error) throw new Error(error.message)
  return data
}
