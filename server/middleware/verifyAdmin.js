import jwt from 'jsonwebtoken';
import status from '../helpers/StatusCode';
import response from '../helpers/responseHandler';

class Auth {
 static async verifyAdmin(req, res, next) {
    const token = req.header('x-auth-token');
    console.log(token);
    if (!token) {
      return response.errorMessage(req, res, 'Provide a Token', status.BAD_REQUEST, 'error');
    }
    try {
      const decode = await jwt.verify(token, process.env.Token_Key);
      console.log(decode);
      if (decode.is_admin !== true) {
        return response.errorMessage(req, res, 'You are not a admin', status.UNAUTHORIZED, 'error');
      }
      next();
    } catch (error) {
      return response.errorMessage(req, res, 'invalid token', status.NOT_FOUND, 'error');
    }
  }

  static verifyuser = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return response.errorMessage(req, res, 'Provide a Token', status.BAD_REQUEST, 'error');
    }
    try {
      const decode = jwt.verify(token, process.env.Token_Key);
      if (!decode) {
        return response.errorMessage(req, res, 'invalid token', status.BAD_REQUEST, 'error');
      }
      next();
    } catch (error) {
      return response.errorMessage(req, res, 'invalid token', status.NOT_FOUND, 'error');
    }
  }

  static verifyMentor = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return response.errorMessage(req, res, 'Provide a Token', status.BAD_REQUEST, 'error');
    }
    try {
      const decode = jwt.verify(token);
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
