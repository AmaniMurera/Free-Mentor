
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import status from './../helpers/StatusCode';

class Authorisation {
  // eslint-disable-next-line class-methods-use-this
  checkAdmin(req, res, next) {
    const token = req.headers.authorisation;

    if (!token) {
      return res.status(status.UNAUTHORIZED).send({
        status: status.UNAUTHORIZED,
        error: 'Token not provided',
      });
    }

    try {
      const decode = jwt.verify(token, process.env.Token_Key);
     
      if (decode.is_admin != true) {
        return res.status(status.FORBIDDEN).send({ status: status.FORBIDDEN, error: 'you are not admin' });
      }

      if (!User.isUserExist(decode.id)) {
        return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'The User doesn\'t exist.' });
      }
      next();
    } catch (error) {
      return res.status(status.BAD_REQUEST).send(
        { status: status.BAD_REQUEST, error: error.message },
      );
    }
    
  }

  // eslint-disable-next-line class-methods-use-this
  checkUser(req, res, next) {
    const token = req.headers.authorisation;

    if (!token) {
      console.log('amani');
      return res.status(status.UNAUTHORIZED).send({
        status: status.UNAUTHORIZED,
        error: 'Token not provided',
      });
    }
    try {
      const decode = jwt.verify(token, process.env.Token_Key);
      // check if user exist

      if (!User.isUserExist(decode.id)) {
        return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'The User does not exist.' });
      }
      next();
    } catch (error) {
      return res.status(status.BAD_REQUEST).send(
        { status: status.BAD_REQUEST, error: error.message },
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkMentor(req, res, next) {
    const token = req.headers.authorisation;

    if (!token) {
      console.log('amani');
      return res.status(status.UNAUTHORIZED).send({
        status: status.UNAUTHORIZED,
        error: 'Token not provided',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.Token_Key);

      if (!User.isUserExist(decoded.id)) {
        return res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'The User  doesn\'t exist.' });
      }


      if (!decoded.is_mentor) {
      // status.FORBIDDEN forbidden
        return res.status(status.FORBIDDEN).send({ status: status.FORBIDDEN, error: 'You are not authorized to perform this action' });
      }
      next();
    } catch (error) {
    // status.BAD_REQUEST: bad request
      return res.status(status.BAD_REQUEST).send(
        { status: status.BAD_REQUEST, error: error.message },
      );
    }
  }
}

export default Authorisation;
