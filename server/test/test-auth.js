

import chai from 'chai';

import chaiHttp from 'chai-http';

import Model from '../models/db';

import app from '../index';

import status from '../helpers/StatusCode';

import users from '../models/users';

const { expect } = chai;

chai.use(chaiHttp);


// Let's first grab the faked user info
const fname = users[0].first_name;
const lname = users[0].last_name;
const { email } = users[0];
let token;

// ############ SIGNUP TEST ############

// Test signup for the user
describe('POST sign up with whitespaced first_name, api/v2/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[10])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('POST sign up with whitespaced last_name, api/v2/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[11])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
describe('POST sign up with whitespaced password, api/v2/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[12])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
describe('POST sign up successfully, api/v2/auth/signup', () => {
  it('should return signup successful', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        
        done();
      });
  });
});

// Test for email existance
describe('POST email already exist, api/v2/auth/signup', () => {
  it('should return {email} already exists', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');

        done();
      });
  });
});

// Test for short password
describe('POST sign up with short password api/v2/auth/signup', () => {
  it('should return error when user entered short password', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"password" length must be at least 8 characters long');
        done();
      });
  });
});

// Test for user data incompleteness
describe('POST sign up with incomplete data api/v2/auth/signup', () => {
  it('should return error when user signup details is incomplete', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"first_name" is required');
        done();
      });
  });
});

// Test for email validation
describe('POST sign up with invalid email api/v2/auth/signup', () => {
  it('should return error when user email is invalid', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"email" is required');
        done();
      });
  });
});


// ############ SIGNin TEST ############

// Test for signin successful
describe('POST signin successfully, api/v2/auth/signin', () => {
  it('should return signin successfullty status', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });
});

// Test for credential incorrectness
describe('POST signin failed, api/v2/auth/signin', () => {
  it('should return signin error status', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.error).to.equal('Invalid Email or Password');
        done();
      });
  });
});

// Test for email missing
describe('POST signin with incomplete data, api/v2/auth/signin', () => {
  it('should return email is required', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"email" is required');
        done();
      });
  });
});

// Test for password missing
describe('POST signin with incomplete data, api/v2/auth/signin', () => {
  it('should return password is required', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[8])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"password" is required');
        done();
      });
  });
});

// Test for sigin email validation
describe('POST signin with invalid email, api/v2/auth/signin', () => {
  it('should return email must be valid', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"email" must be a valid email');
        done();
      });
  });
});

