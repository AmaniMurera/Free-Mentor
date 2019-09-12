import express from 'express';
// import sessionController from '../controllers/sessionController';
// import { validcreateSession} from '../middleware/sessionValidator';

// import reviewController from '../controllers/reviewController';
import Auth from '../middleware/verifyAdmin'

const router = express.Router();


//  router.post('/', validcreateSession, sessionController.SessionController.createSession);


// router.get('/', authorise.checkMentor, SessionController.mentorViewAllSessionRequests);


// router.get('/:id', authorise.checkMentor, SessionController.view_specific_session_request);

// router.patch('/:id/accept', SessionController.acceptSession);

// router.patch('/:id/reject', SessionController.rejectSession);


export default router;
