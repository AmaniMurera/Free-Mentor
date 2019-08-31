import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

// mounting connecting a route to a router.
const user_controller = new UserController();
// signup endpoint
router.post('/auth/signup', user_controller.signUp);
