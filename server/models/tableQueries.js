import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => {
  console.log(err);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    user_id SERIAL NOT NULL PRIMARY KEY,
	  first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  bio VARCHAR NOT NULL,
  expertise VARCHAR NOT NULL,
  occupation VARCHAR NOT NULL,
  is_admin BOOLEAN  DEFAULT false,
  is_mentor  BOOLEAN DEFAULT false

);
INSERT INTO users (
     first_name, last_name, email, password, address,bio , expertise , occupation, is_admin , is_mentor 
    ) VALUES (
         'amani',
         'Boffin',
        'amaniboffin@gmail.com',
        '$2b$10$9DhD.e2mZV/Nma8SEOk.g.F9IJJ17N7IICSeYB8ACrUxXQB20lMjG',
        'kigali',
        'enginner',
        'development',
        'developer',
        true,
        false
);

DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions(
  sessionId SERIAL NOT NULL,
  mentorid INTEGER NOT NULL,
  questions VARCHAR NOT NULL,
  menteeId INTEGER NOT NULL,
  menteeEmail VARCHAR NOT NULL,
  status VARCHAR NOT NULL
);
INSERT INTO sessions(mentorid ,questions,menteeId,menteeEmail,status)
VALUES(
    3,
 'studying',
    2,
 'mj06@gmail.com',
 'accepted'
);


`);

export default createTables;
