import express from 'express';
import { AuthController } from '../../controller';

const router = express.Router();

// Define the route for user login
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication routes
 * * @openapi
 *
 *
 */
router.route('/login').post(AuthController.login);

export default router;
