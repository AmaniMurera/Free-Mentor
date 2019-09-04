import jwt from 'jsonwebtoken';
import status from './StatusCode';

const getUserId = (res, token) => {
  try {
    const decoded = jwt.verify(token, process.env.Token_Key);
    return decoded.id;
  } catch (error) {
    // eslint-disable-next-line max-len
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: error.message });
  }
};

export default getUserId;
