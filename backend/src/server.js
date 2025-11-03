import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import { testSupabaseConnection } from './config/db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Server is running ✅');
});

// Test Supabase connection
testSupabaseConnection();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
