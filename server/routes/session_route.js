import express from 'express';
import SessionController from '../controllers/session_controller';
import Authorisation from '../middleware/protect_routes';

const authorise = new Authorisation();

const router = express.Router();


// creation of object
// const session_controller = new SessionController();

// session creation
router.post('/', authorise.checkUser, SessionController.create);

// a mentor can view all mentorship request sessions created against him
router.get('/', authorise.checkMentor, SessionController.mentorViewAllSessionRequests);

// a mentor can view a specific mentorship request sessions created against him
router.get('/:id', authorise.checkMentor, SessionController.view_specific_session_request);
// a mentor can accept a mentorship request sessions
router.patch('/:id/accept', SessionController.acceptSession);
// a mentor can reject a mentorship request sessions
router.patch('/:id/reject', SessionController.rejectSession);


export default router;
