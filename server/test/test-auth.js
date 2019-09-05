import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


const { expect } = chai;
chai.use(chaiHttp);
chai.should();

const corret_user = {
  first_name: 'kevin',
  last_name: 'Murera',
  email: 'amani@gmail.com',
  password: 'amanmurerakigali',
  address: 'kigali',
  bio: 'engineer',
  occupation: 'engineer',
  expertise: 'software',
};
const { email } = corret_user;

describe('Authentication testss', () => {
  
  it('Should not be able to sign up when email is invalid', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send({

      first_name: 'murera',
      last_name: 'kevin',
      email: 'aman$$n.doegmail',
      password: 'kigalikigali',
      address: 'kigali',
      bio: 'engineer',
      occupation: 'engineer',
      expertise: 'engineer',
    })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('Should not be able to signup when email is empty', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send({
      first_name: 'kimenyi',
      last_name: 'kevin',
      email: '',
      password: 'kigalikigali',
      address: 'kigali',
      bio: 'engineer',
      occupation: 'engineer',
      expertise: 'engineer',
    })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.an('String');
        done();
      });
  });
 
  it('Should not be able to signup when firstName is empty ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        {
          first_name: '',
          last_name: 'kevin',
          email: 'amani@gmail.com',
          password: 'kigalikigali',
          address: 'kigali',
          bio: 'engineer',
          occupation: 'engineer',
          expertise: 'engineer',
        },
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.an('String');
        done();
      });
  });

  it('Should not be able to signup when lastName is empty ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        {
          first_name: 'kevin',
          last_name: '',
          email: 'amani@gmail.com',
          password: 'kigalikigali',
          address: 'kigali',
          bio: 'engineer',
          occupation: 'engineer',
          expertise: 'engineer',
        },
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  
  it('Should not be able to signup when password length is less than 8 character', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        {
          first_name: 'kevin',
          last_name: 'Murera',
          email: 'amani@gmail.com',
          password: 'aman',
          address: 'kigali',
          bio: 'engineer',
          occupation: 'engineer',
          expertise: 'engineer',
        },
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
 
  it('should not be able to signup when address is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        {
          first_name: 'kevin',
          last_name: 'Murera',
          email: 'amani@gmail.com',
          password: 'amanmurerakigali',
          address: '',
          bio: 'engineer',
          occupation: 'engineer',
          expertise: 'engineer',
        },
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
 
  it('should not be able to signup when bio is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        {
          first_name: 'kevin',
          last_name: 'Murera',
          email: 'amani@gmail.com',
          password: 'amanmurerakigali',
          address: 'kigali',
          bio: '',
          occupation: 'engineer',
          expertise: 'engineer',
        },
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
 
  it('should not be able to signup when occupation is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        {
          first_name: 'kevin',
          last_name: 'Murera',
          email: 'amani@gmail.com',
          password: 'amanmurerakigali',
          address: 'kigali',
          bio: 'engineer',
          occupation: '',
          expertise: 'engineer',
        },
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
 
  it('should not be able to signup when expertise is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        {
          first_name: 'kevin',
          last_name: 'Murera',
          email: 'amani@gmail.com',
          password: 'amanmurerakigali',
          address: 'kigali',
          bio: 'engineer',
          occupation: 'engineer',
          expertise: '',
        },
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  
  it('should not be able to signup when details is incomplete', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        {

          last_name: 'Murera',
          email: 'amani@gmail.com',
          password: 'amanmurerakigali',
          address: 'kigali',
          bio: 'engineer',
          occupation: 'engineer',
          expertise: 'software',
        },
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('"first_name" is required');
        done();
      });
  });

  it('should be able to signup when all details are correct', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        corret_user,
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.message).to.equal('User successfully signed up');
        done();
      });
  });
  
  it('should not be able to signup when email is already taken', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(
        corret_user,
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should logged in a user when he provide valid credientials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'amani@gmail.com',
        password: 'amanmurerakigali',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.message).to.equal('User successfully signed in');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
 
  it('shoud not be able to sign in when passowrd is wrong ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'amani@gmail.com',
        password: 'Murera',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('email or password is incorrect!');
        done();
      });
  });
 
  it('should not be able to sign in when email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(
        {
          email: '',
          password: 'amanmurerakigali',
        },
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        done();
      });
  });
 
  it('should not be able to sign in when email is not correct', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'amani88888@gmail.com',
        password: 'amanmurerakigali',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('email or password is incorrect!');
        done();
      });
  });
});
