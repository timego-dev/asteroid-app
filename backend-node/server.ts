import bodyParser from 'body-parser';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';

import neoRoutes from './routes/neos';

const app = express();
// @ts-ignore
const rawBodySaver = function (req, res, buf, encoding) {
  try {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  } catch (error) {}
};

app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ verify: rawBodySaver, limit: '1000mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '1000mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.static('files'));
app.use(morgan('dev'));
dotenv.config({ path: './.env' });

app.use('/api/v1/neos', neoRoutes);

// @ts-ignore
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({
    status: StatusCodes.NOT_FOUND,
    error: 'Invalid Route Url',
  });
});

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(
    // @ts-ignore
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on('unhandledRejection', (err) => {
  // @ts-ignore
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
