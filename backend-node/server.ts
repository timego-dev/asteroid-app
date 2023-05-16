import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';

import neoRoutes from './routes/neos';

const app = express();

app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
dotenv.config({ path: './.env' });

app.use('/api/v1/neos', neoRoutes);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({
    status: StatusCodes.NOT_FOUND,
    error: 'Invalid Route Url',
  });
});

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
