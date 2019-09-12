import express from 'express';
import admin from '../middleware/admin';
import verify from '../middleware/verifyAdmin';

import { validSignup, validSignin } from '../middleware/validator';
import UserController from '../controllers/userController';

const router = express.Router();
const user_controller = new UserController();

const {
  retrieveAllUsers, signup, signin, change_mentor, AllMentors, specificMentor,
} = UserController;
const { verifyAdmin, verifyuser } = verify;

router.post('/signup', validSignup, signup);
router.post('/signin', validSignin, signin);


router.patch('/:id', verifyAdmin, change_mentor);

router.get('/', verifyuser, AllMentors);

router.get('/:id', verifyuser, specificMentor);
export default router;
