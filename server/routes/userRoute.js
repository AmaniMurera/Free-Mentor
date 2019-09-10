import express from 'express';
import admin from '../middleware/admin';

import { validSignup, validSignin } from '../middleware/validator';
import UserController from '../controllers/userController';

const router = express.Router();
const user_controller = new UserController()

const { retrieveAllUsers, signup, signin } = UserController;

router.post('/signup', validSignup, signup);
// router.post('/signin', validSignin, signIn);





router.patch('/:id', user_controller.ChangeUserToMentor);

router.get('/', user_controller.getAllMentors);

router.get('/:id', user_controller.GetOneMentor);
export default router;
