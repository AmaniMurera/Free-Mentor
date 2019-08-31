import express from 'express';
import UserController from '../controllers/userController';
import Authorisation from '../middleware/protect_routes';

const router = express.Router();
const authorisation = new Authorisation();

const user_controller = new UserController();
// signup endpoint
router.post('/auth/signup', user_controller.signUp);
// signin endpoint
router.post('/auth/signin', user_controller.signIn);
// admin can get all users.
router.get('/users', authorisation.checkAdmin, user_controller.GetAllUsers);
// admin can get a specific user
router.get('/users/:id', authorisation.checkAdmin, user_controller.GetSpecificUser);
// admin can delete a user
router.delete('/user/:id', authorisation.checkAdmin, user_controller.deleteUser);
// admin can change user to a mentor
router.patch('/user/:id', authorisation.checkAdmin, user_controller.ChangeToMentor);
// user can get all mentors
router.get('/mentors', authorisation.checkUser, user_controller.getAllMentors);
// user can get a specific mentor by Id
router.get('/mentors/:id', user_controller.GetOneMentor);
export default router;

