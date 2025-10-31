import { supabase } from './config/db.js'; // adjust path if needed

const testConnection = async () => {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  if (error) {
    console.error('❌ Supabase connection failed:', error.message);
  } else {
    console.log('✅ Supabase connected! Sample row:', data[0] || 'No users yet');
  }
};

testConnection();
