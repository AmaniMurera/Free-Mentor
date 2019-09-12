import jwt from 'jsonwebtoken';

const generateAuthToken = (id, userEmail, admin, mentor) => {
  const token = jwt.sign({
    id, email: userEmail, is_mentor: mentor, is_admin: admin,
  }, 'process.env.secretKey');
  return token;
};

export default generateAuthToken;
