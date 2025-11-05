// src/config/db.js
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from './dotenv.js'

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

/**
 * Test connection and show first row of each table
 */
export const testSupabaseConnection = async () => {
  const tables = [
    'users',
    'tickets',
    'attachments',
    'comments',
    'ticket_logs',
    'login_logs'
  ]

  console.log('🔗 Testing Supabase connection...\n')

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error) {
        console.error(`❌ Table "${table}" connection failed:`, error.message)
      } else {
        console.log(`✅ Table "${table}" connected successfully.`)
        console.log(`Sample row from "${table}":`, data[0] || 'No data yet.')
      }
      console.log('-----------------------------------')
    } catch (err) {
      console.error(`❌ Error accessing table "${table}":`, err.message)
    }
  }
}
 