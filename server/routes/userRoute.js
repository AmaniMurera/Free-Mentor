import express from 'express';
import UserController from '../controllers/userController';
import Authorisation from '../middleware/protect_routes';

const router = express.Router();
const authorisation = new Authorisation();

const user_controller = new UserController();

router.post('/signup', user_controller.signUp);
router.post('/signin', user_controller.signIn);





router.patch('/:id', authorisation.checkAdmin, user_controller.ChangeUserToMentor);

router.get('/', authorisation.checkUser, user_controller.getAllMentors);

router.get('/:id', authorisation.checkUser , user_controller.GetOneMentor);
export default router;
