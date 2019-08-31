import jwt from 'jsonwebtoken';
import status from './StatusCode';

const getUserId = (res, token) => {
  
  try {
    const decoded = jwt.verify(token, process.env.Token_Key);
    return decoded.id;
  } catch (error) {
    return res.status(status.BAD_REQUEST).send({ status: 400, error: error.message });
  }
};

export default getUserId;
