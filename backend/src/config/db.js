import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from './dotenv.js'

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Optional: test connection
export const testSupabaseConnection = async () => {
  const { data, error } = await supabase
    .from('ticketing_system')  // ✅ your actual table name
    .select('*')
    .limit(1)

  if (error) {
    console.error('❌ Supabase connection failed:', error.message)
  } else {
    console.log('✅ Supabase connected successfully!')
    console.log('Sample row:', data[0] || 'No data found yet.')
  }
}
