import Joi from 'joi';

class Validator {
  
  validate = (request, schema) => {
    const result = Joi.validate(request, schema);
    return result;
  };

  validateSignUpRequest = (request) => {
    const schema = {
      first_name: Joi.string().alphanum().required(),
      last_name: Joi.string().alphanum().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      address: Joi.string().required(),
      bio: Joi.string().required(),
      occupation: Joi.string().required(),
      expertise: Joi.string().required(),
      is_mentor: Joi.boolean().default(false),
      is_admin: Joi.boolean().default(false),
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

  validateMentorShipRequest = (request) => {
    const schema = {
      mentorId: Joi.number().required(),
      questions: Joi.string().required(),
      status: Joi.string().default('pending'),
    };
    return this.validate(request, schema);
  };

  validData = (name) => {
    const entity = name.replace(/[^a-zA-Z0-9]/g, '');
    if (entity) return true;
    return false;
  };
}

export default new Validator();
