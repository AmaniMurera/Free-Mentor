
import status from '../helpers/StatusCode';
import verifytoken from '../helpers/tokens';
import response from '../helpers/responseHandler';

class Auth {
  static verifyMentor(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
      return response.errorMessage(req, res, 'Provide a Token', status.BAD_REQUEST, 'error');
    }
    try {
      const decode = verifytoken.verifyToken(token);
      if (decode.isMentor !== true) {
        return response.errorMessage(req, res, 'You are not a Mentor', status.UNAUTHORIZED, 'error');
      }
      next();
    } catch (error) {
      return response.errorMessage(req, res, 'invalid token', status.NOT_FOUND, 'error');
    }
  }
}


export default Auth;
