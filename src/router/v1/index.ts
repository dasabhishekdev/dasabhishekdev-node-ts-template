import express from 'express';
import auth_routes from './auth'; // Import auth routes
const router = express.Router();

// Define the route for user login

router.use('/auth', auth_routes);

export default router;
