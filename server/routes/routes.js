import express from 'express';
import userRouter from './userRoute';
import sessionRoute from './session_route';

const app = express();
app.use('/auth', userRouter);
app.use('/users', userRouter);

app.use('/user', userRouter);
app.use('/mentors', userRouter);
app.use('/mentors', userRouter);
app.use('/sessions', sessionRoute);
export default app;