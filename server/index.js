import express from 'express';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import status from './helpers/StatusCode';
import Route from './routes/route';


// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

dotenv.config();

const app = express();
app.use(bodyParse.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/api/v2', Route);


app.use('/', (req, res) => {
  res.status(status.NOT_FOUND).send({
    status: status.NOT_FOUND,
    error: 'Incorrect route',
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
export default app;
