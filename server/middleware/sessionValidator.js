
import Joi from 'joi';
import status from '../helpers/StatusCode';


  export const validcreateSession = (req, res, next) => {
   const schema = {
    mentorid: Joi.number().required(),
    questions: Joi.string().required(),

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
