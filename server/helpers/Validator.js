import Joi from 'joi';

class Validator {
  // General Validation method for all ones
  validate = (request, schema) => {
    const result = Joi.validate(request, schema);
    return result;
  };

  // SignUp validator fn
  validateSignUpRequest = (request) => {
    const schema = {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      address: Joi.string().required(),
      bio: Joi.string().required(),
      occupation: Joi.string().required(),
      expertise: Joi.string().required(),
      is_dmin: Joi.boolean().default(false),
      is_mentor: Joi.boolean().default(false),
    };
    return this.validate(request, schema);
  };

  
  validateSignInRequest = (request) => {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.required(),
    };
    return this.validate(request, schema);
  };

 


}

export default new Validator();