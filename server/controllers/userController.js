import generateAuthToken from '../helpers/tokens';
import Model from '../models/db';
import hashPassword from '../helpers/hashPassword';
import status from '../helpers/StatusCode';


class UserController {
  static model() {
    return new Model('users');
  }

  static retrieveAllUsers = async (req, res) => {
    try {
      const rows = await this.model().select('user_id, email, first_name, last_name, is_admin');
      // If no users are registered
      if (rows.length === 0) {
        return res.status(400).json({
          status: status.NOT_FOUND,
          error: 'No user found',
        });
      }
      // If all users have been retrieved
      return res.status(200).json({
        status: status.REQUEST_SUCCEDED,
        message: 'All users are retrived successfully',
        data: rows,

      });
    } catch (e) {
      // Catch any error if it rises
      return res.status(status.SERVER_ERROR).json({
        status: status.SERVER_ERROR,
        error: 'server error',
       
      });
    }
  }

    static signup = async (req, res) => {
      try {
        let {
          first_name,
          last_name,
          email,
          password,
          address,
          bio,
          expertise,
          occupation,
          is_admin,
          is_mentor,

        } = req.body;

        // Generate a unique ID
        // Check if Email already exist
        const user = await this.model().select('*', 'email=$1', [email]);
        if (user[0]) {
          // Catch any error if it rises
          return res.status(status.REQUEST_CONFLICT).json({
            status: status.REQUEST_CONFLICT,
            error: `${email} already exists`,

          });
        }
        // Hash user password before being stored
        password = await hashPassword.encryptPassword(password);
        // console.log(password);
        const cols = 'first_name, last_name, email, password, address, bio ,expertise, occupation, is_admin, is_mentor';
        
        const sels = `'${first_name}', '${last_name}', '${email}', '${password}', '${address}', '${bio}','${expertise}','${occupation}', '${is_admin}', '${is_mentor}'`;
        const rows = await this.model().insert(cols, sels);


        let token = generateAuthToken(rows[0].user_id, rows[0].is_admin);

        return res.status(status.RESOURCE_CREATED).json({
          status: status.RESOURCE_CREATED,
          message: 'User signed up successfully',
          token,
        });
        // });
      } catch (e) {
        // Catch any error if it rises
        return res.status(500).json({
          status: status.SERVER_ERROR,
          error: 'server error',
          
        });
      }
    }

    signIn = (req, res) => {
      const result = Validator.validateSignInRequest(req.body);
      if (result.error == null) {
        const user = User.login(req.body);
        if (user.status === status.REQUEST_SUCCEDED) {
          res.set('x-auth-token', user.data.token);
          return res.status(status.REQUEST_SUCCEDED).send(user);
        }

        return res.status(status.UNAUTHORIZED).send(user);
      }

      return res.status(status.BAD_REQUEST).send({
        status: status.BAD_REQUEST,
        error: `${result.error.details[0].message}`,
      });
    };




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
