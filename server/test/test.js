import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);


const adminToken = jwt.sign({ id: 1, is_admin: true, is_mentor: false }, process.env.Token_Key);
const mentorToken = jwt.sign({ id: 4, is_admin: false, is_mentor: true }, process.env.Token_Key);
const menteeToken = jwt.sign({ id: 1, is_admin: false, is_mentor: false }, process.env.Token_Key);
const invalidToken = jwt.sign({ id: 0, is_admin: false, is_mentor: false }, process.env.Token_Key);
const expired_token = jwt.sign({ id: 1000, is_admin: true, is_mentor: false }, process.env.Token_Key);


// 1.test for get all users
describe('admin get all users ', () => {
  it('should return all users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('authorisation', adminToken)
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);

        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should not be able to get all users when admin does not provide token', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('authorisation','')
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        res.body.should.be.a('object');
        done();
      });
  });
  it('should not be able to get all users when admin provide invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('authorisation','invalidToken')
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        res.body.should.have.property('status');
        res.body.should.have.property('error') ;
        done();
      });
  });

});