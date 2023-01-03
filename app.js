import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import router from './routes/index.js';
import cors from 'cors';

dotenv.config({ path: './.env' });

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

export default app;
