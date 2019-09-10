
import Joi from 'joi';
import Model from '../models/db';
import status from '../helpers/StatusCode';


// Check user field
export const validData = (name) => {
  let entity = name.replace(/[^a-zA-Z0-9]/g, '');
  if (entity) return true;
  return false;
};
// Validate signup data

export const validSignup = (req, res, next) => {
  const schema = {
    first_name: Joi.string().alphanum().required(),
    last_name: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    is_admin: Joi.boolean().default(false),
    address: Joi.string().required(),
    bio: Joi.string().required(),
    expertise: Joi.string().required(),
    occupation: Joi.string().required(),
    is_mentor: Joi.boolean().default(false),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) { return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` }); }
  if (!validData(req.body.first_name)) {
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'first_name can\'t be empty' });
  }
  if (!validData(req.body.last_name)) {
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'last_name can\'t be empty' });
  }
  if (!validData(req.body.password)) {
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'password can\'t be empty' });
  }

  next();
};
