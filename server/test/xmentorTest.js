import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import users from '../models/users';

import status from '../helpers/StatusCode';

import generateToken from '../helpers/tokens';

const { expect } = chai;

chai.use(chaiHttp);

const token = generateToken.generateToken(1, users[14].email, false, true);
const Invalidtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwidXNlckVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2Nzc1ODUxNywiZXhwIjoxNTY3ODQ0OTE3fQ.qq-fyGN5VnrTwJQDzrbXUhhARO_JDS-q3KedVWU20QU';

describe('GET Both Admin and Users can see all mentors, api/v2/mentors', () => {
  it('should return all mentors', (done) => {
    chai.request(app)
      .get('/api/v2/mentors')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.status).to.equal(status.REQUEST_SUCCEDED);
        done();
      });
  });
});


describe('GET View a specific mentor api/v2/mentors/{mentor_Id}', () => {
  it('should return a specific mentor', (done) => {
    chai.request(app)
      .get('/api/v2/mentors/1')
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.data.id).to.equal(1);
        expect(res.status).to.equal(status.REQUEST_SUCCEDED);
        done();
      });
  });
});

describe('GET View specifc mentor with an id not an integer', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .get('/api/v2/mentors/k')
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('Mentor id should be integer');
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('GET view specific , api/v2/mentors', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .get('/api/v2/mentors/9000')
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('No mentors available with that Id');
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
});

describe('GET user with invalid token, api/v2/mentors', () => {
  it('should return all mentors', (done) => {
    chai.request(app)
      .get('/api/v2/mentors')
      .set('x-auth-token', Invalidtoken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('invalid token');
        done();
      });
  });
});