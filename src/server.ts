import express from 'express';
import type { Express, Request, Response } from 'express';
import * as process from "node:process";
import { studentRoutes } from './routes/studentRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import { authRoutes } from './routes/authRoutes.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

// Register routes
app.use("/api", authRoutes);
app.use("/api", studentRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});