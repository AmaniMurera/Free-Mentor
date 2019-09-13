import jwt from 'jsonwebtoken';

const Helper = {

  generateToken(id, email, mentor, admin) {
    const token = jwt.sign({
      Id: id,
      userEmail: email,
      isMentor: mentor,
      isAdmin: admin,
    },
    process.env.Token_Key, { expiresIn: '1d' });
    return token;
  },

  verifyToken(token) {
    return jwt.verify(token, process.env.Token_Key);
  },
};

export default Helper;
