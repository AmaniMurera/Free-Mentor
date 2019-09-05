import _ from 'lodash';
import generateAuthToken from '../helpers/tokenGenerator';
import status from '../helpers/StatusCode';


class User {
  
  constructor() {
    this.users = [
      {
        
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
      { 
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
      {
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
      { 
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

    login = (payload) => {
      
      const user = this.users.find((Wuser) => (Wuser.email === payload.email)
         && ((Wuser.password === payload.password)));
      if (!user) {
        return {
          status: status.UNAUTHORIZED,
          error:
         'email or password is incorrect!',
        };
      }

      let result = {
        token: generateAuthToken(user.id, user.is_admin, user.is_mentor),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };
      result = {
        status: status.REQUEST_SUCCEDED,
        message: 'User successfully signed in',
        data: result,
      };

      return result;
    };

      isEmailTaken = (email) => this.users.find((u) => u.email === email);

      isUserExist = (user_id) => this.users.find((u) => u.id === user_id);


    checkMentor = (id) => {
      const user = this.users.find((mentor) => mentor.id === parseInt(id, 10));
      console.log(user.is_mentor);
      if (user.is_mentor === true) { return true; }
      return false;
    }
     userEmail = (user_id) => {
       const user = this.users.find((u) => u.id === parseInt(user_id, 10));
       return user.email;
     }
}

export default new User();
