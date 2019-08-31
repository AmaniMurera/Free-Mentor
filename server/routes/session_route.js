import express from 'express';
import SessionController from '../controllers/session_controller';
import Authorisation from '../middleware/protect_routes';

const authorise = new Authorisation();

const router = express.Router();


// creation of object
const session_controller = new SessionController();
