import express from 'express';
import { getTestUsers, createTestUser, hashPassword } from '../controllers/testController.js';

const router = express.Router();

// Route to get all users
router.get('/users', getTestUsers);

// Route to create a new user
router.post('/users', createTestUser);

// Route to hash a password
router.post('/hash-password', hashPassword);

export default router;
