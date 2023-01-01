import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import router from './routes/index.js';

dotenv.config({ path: './.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(router);

export default app;
