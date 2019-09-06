
import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);


const mentorToken = jwt.sign({ id: 4, is_admin: false, is_mentor: true }, process.env.Token_Key);
const menteeToken = jwt.sign({ id: 1, is_admin: false, is_mentor: false }, process.env.Token_Key);
const invalidToken = jwt.sign({ id: 0, is_admin: false, is_mentor: false }, process.env.Token_Key);
const expired_token = jwt.sign({ id: 1000, is_admin: true, is_mentor: false }, process.env.Token_Key);

describe('request session', () => {
  it('should not be able to request session when user does not provide token', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .send({
        mentorId: 3,
        questions: 'ffffffffffffffff',
      })

      .set('authorisation', ' ')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to request session when a user does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .send({
        mentorId: 4,
        questions: 'ffffffffff ',
      })
      .set('Accept', 'application/json')
      .set('authorisation', expired_token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.equal('The User does not exist.');
        done();
      });
  });
  it('should not be able to request a mentorship session when mentorId field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .send({
        mentorId: '',
        questions: 'ffffffffff ',
      })
      .set('Accept', 'application/json')
      .set('authorisation', menteeToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able to request a mentorship session when questions field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .send({
        mentorId: 'fffffffffff',
        questions: '',
      })
      .set('Accept', 'application/json')
      .set('authorisation', menteeToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able to request a mentorship session when mentorId is incorrect', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .send({
        mentorId: 400,
        questions: 'fffffff',
      })
      .set('Accept', 'application/json')
      .set('authorisation', menteeToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able to request a mentorship session when mentorId is incorrect', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .send({
        mentorId: 400,
        questions: 'fffffff',
      })
      .set('Accept', 'application/json')
      .set('authorisation', menteeToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able to request a mentorship session when a mentee does not send a token is request headers', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .send({
        mentorId: 400,
        questions: 'fffffff',
      })
      .set('Accept', 'application/json')
      .set('authorisation', '')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should  be able to request a mentorship session when all deatails are correct', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .send({
        mentorId: 4,
        questions: 'fffffff',
      })
      .set('Accept', 'application/json')
      .set('authorisation', menteeToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.should.have.property('data').to.be.an('object');

        done();
      });
  });
});

describe('mentor can view all mentorship request sessions created against him', () => {
  it('should not be able view all mentorship request sessions when a mentor does not provide token', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('authorisation', ' ')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able view all mentorship request sessions when a mentor  provide token ivalid token', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('authorisation', invalidToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able view all mentorship request sessions when a mentor does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('authorisation', expired_token)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able view all mentorship request sessions when a user is not a mentor', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('authorisation', menteeToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should be able view all mentorship request sessions when a user is not a mentor', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('authorisation', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('data').to.be.an('array');
        done();
      });
  });
});


describe('mentor can view a specific mentorship request session created against him', () => {
  it('should be able view a specific mentorship request session', (done) => {
    chai.request(app)
      .get('/api/v1/sessions/1')
      .set('authorisation', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status');
        expect(res.body).to.have.property('data').to.be.an('array');
        done();
      });
  });
  it('should be not able view a specific mentorship request session when session Id is icorrect', (done) => {
    chai.request(app)
      .get('/api/v1/sessions/2')
      .set('authorisation', jwt.sign({ id: 2, is_admin: false, is_mentor: true }, process.env.Token_Key))
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should be not able view a specific mentorship request session when a user is not a mentor', (done) => {
    chai.request(app)
      .get('/api/v1/sessions/0')
      .set('authorisation', invalidToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should be not able view a specific mentorship request session when there is no session for him', (done) => {
    chai.request(app)
      .get('/api/v1/sessions/0')
      .set('authorisation', invalidToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
});
describe('mentor can accept mentorship request session ', () => {
  it('should be able to accept mentorship request session created against him', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('authorisation', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data').to.be.a('object');
        done();
      });
  });
  it('should not be able to accept mentorship request session which is already accepted', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('authorisation', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able to accept mentorship request session which is not does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1000/accept')
      .set('authorisation', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
});
describe('mentor can reject mentorship request session ', () => {
  it('should be able to reject mentorship request session created against him', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/2/reject')
      .set('authorisation', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data').to.be.a('object');
        res.body.should.have.property('status');
        done();
      });
  });
  it('should not be able to reject mentorship request session which is already rejected', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/2/reject')
      .set('authorisation', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able to reject mentorship request session which is already accepted', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1/reject')
      .set('authorisation', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able to reject mentorship request session which is not does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1000/reject')
      .set('authorisation', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        done();
      });
  });
});
