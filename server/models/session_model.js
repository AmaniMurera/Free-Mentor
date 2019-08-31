import userInfo from '../helpers/userInfos';
import status from '../helpers/StatusCode';
import User from './userModel';


class Session {
  constructor() {
    this.sessions = [
      // set default session1
      {
        sessionId: 1,
        mentorId: 4,
        menteeId: 1,
        questions: 'fbsdbfsbdfwjsebfwjebfj fbvsdjbvskdzvb vdjzvb sjdvb sdzbv xsdzmv',
        menteeEmail: 'Mureraamani@gmail.com',
        status: 'pending',
      },
      // set default session2
      {
        sessionId: 2,
        mentorId: 4,
        menteeId: 3,
        questions: 'fbsdbfsbdfwjsebfwjebfj fbvsdjbvskdzvb vdjzvb sjdvb sdzbv xsdzmv',
        menteeEmail: 'rosineumrerwa@gmail.com',
        status: 'pending',
      },
    ];
  }

  // create sessions
  createSession = (res, payload, token) => {
    let sessionid = this.sessions.length + 1;

    let newSession = {
      sessionId: sessionid,
      mentorId: payload.mentorId,
      menteeId: userInfo(res, token),
      questions: payload.questions,
      menteeEmail: User.userEmail(userInfo(res, token)),
      status: 'pending',
    };
    this.sessions.push(newSession);
    newSession = {
      status: status.REQUEST_SUCCEEDED,
      message: 'Session successfully created',
      data: newSession,
    };
    return newSession;
  };


}
export default new Session();
