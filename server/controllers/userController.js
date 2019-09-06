import Joi from 'joi';
import User from '../models/userModel';
import status from '../helpers/StatusCode';


class UserController {
    signUp = (req, res) => {
    
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
      const result = Joi.validate(req.body, schema);
      if (result.error == null) {
        if (User.isEmailTaken(req.body.email)) {
          
          return res.status(status.REQUEST_CONFLICT).send({ status: status.REQUEST_CONFLICT, error: `${req.body.email} already exists` });
        }

        const user = User.create(req.body);
        return res.status(status.RESOURCE_CREATED).send(user);
      }
      return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
    };

    signIn = (req, res) => {
      
      const schema = {
        email: Joi.string().email().required(),
        password: Joi.required(),
      };
      const result = Joi.validate(req.body, schema);
      if (result.error == null) {
     
        const user = User.login(req.body);
        if (user.status === status.REQUEST_SUCCEDED) {
          res.set('x-auth-token', user.data.token);
          return res.status(status.REQUEST_SUCCEDED).send(user);
        }

        return res.status(status.UNAUTHORIZED).send(user);
      }
      return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
    };
    
    GetAllUsers(req, res) {
      const allusers = User.users;
      if (allusers.length <= 0) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          message: 'No users found',
        });
      }
      return res.status(status.REQUEST_SUCCEDED).send({
        status: status.REQUEST_SUCCEDED,
        data: allusers,
      });
    }

    GetSpecificUser(req, res) {
      const singleUser = User.users.find((user) => user.id == req.params.id);
      if (!singleUser) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          error: 'User not found',
        });
      }
      return res.status(status.REQUEST_SUCCEDED).send({
        status: status.REQUEST_SUCCEDED,
        data: singleUser,
      });
    }

    ChangeUserToMentor(req, res) {
      const user = User.users.find((user) => user.id == req.params.id);
      if (!user) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          error: 'User not found',
        });
      }
      if (user.is_mentor === true) {
        return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'User is already a mentor' });
      }
      user.is_mentor = true;

      return res.status(status.REQUEST_SUCCEDED).send({
        status: status.REQUEST_SUCCEDED,
        data: {
          message: 'user successfully changed to mentor',
          user,

        },
      });
    }

    deleteUser(req, res) {
      const currentuserUser = User.users.find((user) => user.id == req.params.id);
      if (!currentuserUser) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          error: 'Not Found',
        });
      }
      const indexOfCurrentuserUser = User.users.indexOf(currentuserUser);
      if (indexOfCurrentuserUser > -1) {
        const removeOne = User.users.splice(indexOfCurrentuserUser, 1);
        if (removeOne) {
          return res.status(status.REQUEST_SUCCEDED).send({
            status: status.REQUEST_SUCCEDED,
            message: 'Successfully Deleted a User',
          });
        }
      }

      return res.status(status.BAD_REQUEST).send({
        status: status.BAD_REQUEST,
        err: 'Unable to delete',
      });
    }

    getAllMentors(req, res) {
      const allMentors = User.users.filter((user) => user.is_mentor == true);
      if (allMentors.length < 1) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          message: 'mentors are not available',
        });
      }

      return res.status(status.REQUEST_SUCCEDED).send({
        status: status.REQUEST_SUCCEDED,
        data: allMentors,
      });
    }

    GetOneMentor(req, res) {
      const allMentors = User.users.filter((user) => user.is_mentor == true);
      if (allMentors.length < 1) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          message: 'mentors are not available',
        });
      }

      const specificMentor = allMentors.find((user) => user.id == req.params.id);
      if (!specificMentor) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          error: 'No mentor found',
        });
      }
      return res.status(status.REQUEST_SUCCEDED).send({
        status: status.REQUEST_SUCCEDED,
        data: specificMentor,
      });
    }
}


export default UserController;
