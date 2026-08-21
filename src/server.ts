import express, { type Express, type Request, type Response } from 'express';
import * as process from "node:process";
import studentRoutes from './routes/studentsRoutes.js'

const app : Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use("/api", studentRoutes );

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});