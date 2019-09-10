
import swaggerui from 'swagger-ui-express';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config/default';
import status from './helpers/StatusCode';
import swaggerdocs from '../docs/swaggerdocs.json';
import routes from './routes/routes';
import createTable from './models/tableQueries';

// eslint-disable-next-line no-unused-expressions
// createTable.createTables;


const app = express();
app.use(bodyParser.json());

app.use('/api/v2/', routes);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerdocs));

app.use('/', (req, res) => {
  res.status(status.NOT_FOUND).send({
    status: status.NOT_FOUND,
    error: 'Incorrect route',
  });
});

const { port } = config;
app.listen(port, () => console.log(`server listen on port ${port}...`));

export default app;
