import Session from '../models/session_model';
import status from '../helpers/StatusCode';
import User from '../models/userModel';
import userInfo from '../helpers/userInfos';
import Validator from '../helpers/validator';

class SessionController {
  create = (req, res) => {
    const result = Validator.validateMentorShipRequest(req.body);

    if (result.error == null) {
      if (!User.isUserExist(req.body.mentorId)) {
        res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'Such user is not found' });
      }
      if (!User.checkMentor(req.body.mentorId)) {
        res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'Such mentor is not found' });
      }
      const session = Session.createSession(res, req.body, req.headers.authorisation);
      return res.status(200).send({
        status: 200,
        data: session,
      });
    }
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
  }

  mentorViewAllSessionRequests(req, res) {
    const sessionRequests = Session.sessions.filter((session) => session.mentorId === userInfo(res, req.headers.authorisation));
    if (sessionRequests.length < 1) {
      return res.status(404).send({
        status: 404,
        error: 'No sessions for you',
      });
    }
    return res.status(200).send({
      status: 200,
      data: sessionRequests,
    });
  }

  menteeViewAllSessionRequests(req, res) {
    const sessionRequests = Session.sessions.filter((session) => session.menteeId === userInfo(res, req.headers.authorisation));
    if (sessionRequests.length < 1) {
      return res.status(404).send({
        status: 404,
        error: 'No sessions for you',
      });
    }
    return res.status(200).send({
      status: 200,
      data: sessionRequests,
    });
  }

  view_specific_session_request(req, res) {
    const sessionId2 = req.params.id;
    const sessionRequests = Session.sessions.filter((session) => session.mentorId === userInfo(res, req.headers.authorisation));
    if (sessionRequests.length < 1) {
      return res.status(404).send({
        status: 404,
        error: 'No sessions for you',
      });
    }
    const sessionRequest = sessionRequests.filter((el) => el.sessionId == sessionId2);
  

    if (sessionRequest.length < 1) { return res.status(404).send({ status: 404, error: 'session not found' }); }
    return res.status(200).send({
      status: 200,
      data: sessionRequest,
    });
  }

  
  acceptSession = (req, res) => {
    if (isNaN(req.params.id.trim())) {
      return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'Session id should be an integer' });
    }
    
    const result = Session.accept(res, req.params.id);
    return res.status(200).send({ status: 200, data: { data: result } });
  }
 rejectSession = (req, res) => {
  if (isNaN(req.params.id.trim())) {
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'Session id should be an integer' });
  }
  const result = Session.reject(res, req.params.id);
  return res.status(200).send({ status: 200, data: { data: result } });
}
}
export default new SessionController();
