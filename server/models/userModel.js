import _ from 'lodash';
import generateAuthToken from '../helpers/tokenGenerator';
import status from '../helpers/StatusCode';


class User {
  // constructor invoked automatically after creating object of class
  constructor() {
    this.users = [
      {
        // set a default admin
        id: 1,
        first_name: 'Amani',
        last_name: 'Murera',
        email: 'amanidiope@gmail.com',
        password: 'dangerous',
        address: 'kigali',
        bio: 'engineer',
        occupation: 'engineer',
        expertise: 'software',
        is_admin: true,
        is_mentor: false,
      },
      { // set a default user1
        id: 2,
        first_name: 'Amani',
        last_name: 'Murera',
        email: 'manzimiguel@gmail.com',
        password: 'dangerous',
        address: 'kigali',
        bio: 'engineer',
        occupation: 'engineer',
        expertise: 'software',
        is_admin: false,
        is_mentor: false,
      },
      { // set a default user2
        id: 3,
        first_name: 'Amani',
        last_name: 'Murera',
        email: 'rosineumrerwa@gmail.com',
        password: 'dangerous',
        address: 'kigali',
        bio: 'engineer',
        occupation: 'engineer',
        expertise: 'software',
        is_admin: false,
        is_mentor: false,
      },
      { // set a default mentor
        id: 4,
        first_name: 'Amani',
        last_name: 'Murera',
        email: 'ericirakoze@gmail.com',
        password: 'dangerous',
        address: 'kigali',
        bio: 'engineer',
        occupation: 'engineer',
        expertise: 'software',
        is_admin: false,
        is_mentor: true,
      },

    ];
  }

    create = (payload) => {
      let {
        first_name, last_name, email, password, address, bio, occupation,
        expertise, is_admin, is_mentor,
      } = payload;

      if (is_admin === undefined) {
        is_admin = false;
      }
      if (is_mentor === undefined) {
        is_mentor = false;
      }
      const currentId = this.users.length + 1;

      let newUser = {
        token: generateAuthToken(currentId, payload.is_admin, payload.is_mentor),
        id: currentId,
        first_name,
        last_name,
        email,
        password,
        address,
        bio,
        occupation,
        expertise,
        is_admin,
        is_mentor,
      };

      this.users.push(newUser);
      newUser = {
        status: status.RESOURCE_CREATED,
        message: 'User successfully signed up',
        data: _.pick(newUser, ['token', 'id',
          'first_name', 'last_name', 'email']),
      };

      return newUser;
    };
}

export default new User();
