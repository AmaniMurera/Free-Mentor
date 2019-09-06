
import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);


const adminToken = jwt.sign({ id: 1 ,is_admin: true, is_mentor: false }, process.env.Token_Key);
const menteeToken = jwt.sign({ id: 2, is_admin: false, is_mentor: false }, process.env.Token_Key);
const invalidToken = jwt.sign({ id: 0, is_admin: false, is_mentor: false }, process.env.Token_Key);
const expired_token = jwt.sign({ id: 1000, is_admin: true, is_mentor: false }, process.env.Token_Key);


describe('admin can change user to mentor,api/v1/auth/user/:id', () => {
  it('should return User account changed to mentor', (done) => {
    chai.request(app)
      .patch('/api/v1/user/2')
      .set('authorisation', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        done();
      });
  });
});


describe('change into mentor a user who is already a mentor ', () => {
  it('should return User is already a mentor', (done) => {
    chai.request(app)
      .patch('/api/v1/user/4')
      .send({
        is_mentor: 'true',
      })
      .set('authorisation', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
});

describe('change into mentor a user who is already a mentor ', () => {
  it('should return User deos\'t exist', (done) => {
    chai.request(app)
      .patch('/api/v1/user/1000')
      .send({
        is_mentor: 'true',
      })
      .set('authorisation', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});




describe('user can get all mentors', () => {
  it('should return all available mentors', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')

      .set('authorisation', menteeToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        done();
      });
  });
});

describe('user can get all mentors with invalid token', () => {
  it('should return invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')

      .set('authorisation', invalidToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('user try to get all mentors when he does not send his token in request headers', () => {
  it('should return invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')

      .set('authorisation', ' ')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('user get all mentors when he send an expired token in request headers', () => {
  it('should return invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')

      .set('authorisation', expired_token)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});


describe('user get a unexisted mentor', () => {
  it('should return such mentor does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/mentors/100')

      .set('authorisation', menteeToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
});
