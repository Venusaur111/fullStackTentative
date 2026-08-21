import request from 'supertest';
import express from 'express';
import { studentRoutes } from '../src/routes/studentRoutes.js';

const app = express();
app.use(express.json());
app.use('/api', studentRoutes);

describe('Student Integration Tests', () => {
    it('should return 200 and a list of students', async () => {
        const response = await request(app).get('/api/students');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});