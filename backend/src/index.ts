import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes';
import console = require('node:console');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express());

app.use('/', studentRoutes);

app.listen(PORT, () => {
    console.log('Server starting on the PORT ${PORT}')
});