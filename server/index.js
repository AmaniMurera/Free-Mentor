
import swaggerui from 'swagger-ui-express';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config/default';

import swaggerdocs from '../docs/swaggerdocs.json';
import routes from './routes/routes';

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/', routes);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerdocs));

const { port } = config;
app.listen(port, () => console.log(`server listen on port ${port}...`));

export default app;
