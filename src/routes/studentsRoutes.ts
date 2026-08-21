import { Router } from 'express';
import { StudentRepository } from '../repositories/studentRepository.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();
const studentRepository = new StudentRepository();

router.get('/students', async (req, res) => {
    try {
        const students = await studentRepository.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.post('/students', verifyToken, async (req, res) => {
    try {
        const newStudent = await studentRepository.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.delete('/students/:id', verifyToken, async (req, res) => {
    try {
        const deleted = await studentRepository.delete(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export const studentRoutes = router;