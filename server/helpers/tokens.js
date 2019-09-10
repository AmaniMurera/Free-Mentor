import jwt from 'jsonwebtoken';

const generateAuthToken = (id, admin, mentor) => {
  const token = jwt.sign({ id, is_admin: admin, is_mentor: mentor }, process.env.Token_Key);
  return token;
};

export default generateAuthToken;
