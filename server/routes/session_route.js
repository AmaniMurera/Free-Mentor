import express from 'express';
import SessionController from '../controllers/session_controller';
import Authorisation from '../middleware/protect_routes';

const authorise = new Authorisation();

const router = express.Router();


router.post('/', authorise.checkUser, SessionController.create);


router.get('/', authorise.checkMentor, SessionController.mentorViewAllSessionRequests);


router.get('/:id', authorise.checkMentor, SessionController.view_specific_session_request);

router.patch('/:id/accept', SessionController.acceptSession);

router.patch('/:id/reject', SessionController.rejectSession);


export default router;
