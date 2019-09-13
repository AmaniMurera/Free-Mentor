import Joi from 'joi';
import status from '../helpers/StatusCode';

export const validsignUp = (req, res, next) => {
  const schema = {
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
    address: Joi.string().required(),
    bio: Joi.string().required(),
    occupation: Joi.string().required(),
    expertise: Joi.string().required(),
    isAdmin: Joi.boolean(),
    isMentor: Joi.boolean(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return res.status(status.BAD_REQUEST).send(
      {
        status: status.BAD_REQUEST,
        error: result.error.details[0].message,
      },
    );
  }
  next();
};


export const validSignin = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.required(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error !== null) {
    return res.status(status.BAD_REQUEST).send(
      {
        status: status.BAD_REQUEST,
        error: result.error.details[0].message,
      },
    );
  }
  next();
};
