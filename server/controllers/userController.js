import lodash from 'lodash';
import generateAuthToken from '../helpers/tokens';
import Model from '../models/db';
import hashPassword from '../helpers/hashPassword';
import status from '../helpers/StatusCode';
import response from '../helpers/responseHandler';


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


        let token = generateAuthToken(rows[0].user_id,rows[0].is_admin);

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

    static signin = async (req, res) => {
      try {
        const { email, password } = req.body;
        const data = await this.model().select('*', 'email=$1', [email]);
        //  If user credentials are correct
        if (data[0] && hashPassword.decryptPassword(password, data[0].password)) {
          const token = generateAuthToken(data[0].user_id, data[0].is_admin);
          return res.status(status.REQUEST_SUCCEDED).json({
            status: status.REQUEST_SUCCEDED,
            message: 'user signed in successfully',
            token,
          });
        }
        // If no user is found with provided inputs
        return res.status(status.UNAUTHORIZED).json({
          status: status.UNAUTHORIZED,
          error: 'Invalid Email or Password',
        });
      } catch (e) {
        // Catch any error if it rises
        return res.status(status.SERVER_ERROR).json({
          status: status.SERVER_ERROR,
          error: 'server error',
          // e,
        });
      }
    };


    // CHANGE USER TO A MENTOR
  static change_mentor = async (req, res) => {
    const userId = req.params.id;
    console.log(req.params);
    const user = await this.model().select('*', 'user_id=$1', [userId]);
    if (!user[0]) {
      return response.errorMessage(req, res, `No user available with id ${userId}`, status.NOT_FOUND, 'error');
    }
    if (user[0].is_mentor === true) {
      return response.errorMessage(req, res, 'already a mentor', status.NOT_FOUND, 'error');
    }
    await this.model().update('is_mentor=$1', 'user_id= $2', [true, user[0].user_id]);
    const ismentor = !user[0].is_mentor;
    const data = {
      ismentor,
    };
    return response.successMessage(req, res, 'User changed to a mentor successfully', status.REQUEST_SUCCEDED, data);
  }


  // GET ALL MENTORS
  static AllMentors = async (req, res) => {
    const mentors = [];
    const is_mentor = true;
    const mentor = await this.model().select('*', 'is_mentor=$1', [is_mentor]);
    for (let item = 0; item < mentor.length; item += 1) {
      mentors.push(lodash.pick(mentor[item],
        ['user_id', 'first_name', 'last_name', 'email',
          'address', 'bio', 'occupation', 'expertise']));
    }
    if (mentors.length <= 0) {
      return response.errorMessage(req, res, 'No available mentors', status.NOT_FOUND, 'error');
    }
    const data = {
      mentors,
    };
    return response.successMessage(req, res, 'succeed', status.REQUEST_SUCCEDED, data);
  }

  static specificMentor = async (req, res) => {
    const mentorId = req.params.id;
    // notNumber(mentorId, res);
    const userStatus = true;
    let mentor = await this.model().select('*', 'user_id=$1 AND is_mentor=$2', [mentorId, userStatus]);
    if (!mentor[0]) {
      return res.status(status.NOT_FOUND).send({
        status: status.NOT_FOUND,
        error: `Mentor with this Id ${mentorId} does not exist`,
      });
    }
    return res.status(status.REQUEST_SUCCEDED).send({
      status: status.REQUEST_SUCCEDED,
      message: `More informtion about user with id ${mentorId} are:`,
      data: lodash.pick(mentor[0], 'user_id', 'first_name', 'last_name', 'email', 'address', 'bio', 'occupation', 'expertise'),
    });
  }

}


export default UserController;
