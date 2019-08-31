import express from 'express';
import bodyParser from 'body-parser';
import config from './config/default';
import userRouter from './routes/userRoute';
import sessionRoute from './routes/session_route';

const app = express();
app.use(bodyParser.json());
app.use('/api/v1', userRouter);
app.use('/api/v1/', sessionRoute);

const { port } = config;
app.listen(port, () => console.log(`server listen on port ${port}...`));

export default app;