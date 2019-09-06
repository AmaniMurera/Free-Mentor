import express from 'express';
import SessionController from '../controllers/session_controller';
import Authorisation from '../middleware/protect_routes';

const authorise = new Authorisation();

const router = express.Router();

const session_controller = new SessionController();


router.post('/', authorise.checkUser, session_controller.create);

router.get('/', authorise.checkMentor, session_controller.mentorViewAllSessionRequests);


router.get('/:id', authorise.checkMentor, session_controller.view_specific_session_request);

router.patch('/:id/accept', session_controller.acceptSession);

router.patch('/:id/reject', session_controller.rejectSession);


export default router;
