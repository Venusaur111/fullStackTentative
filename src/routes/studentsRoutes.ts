import { Router } from 'express';
import { StudentRepository } from '../repositories/studentRepository.js';

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

router.get('/students/:id', async (req, res) => {
    try {
        const student = await studentRepository.findStudentById(Number(req.params.id));
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.post('/students', async (req, res) => {
    try {
        const newStudent = await studentRepository.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/students/:id/name', async (req, res) => {
    try {
        const updated = await studentRepository.updateName(Number(req.params.id), req.body.name);
        if (!updated) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/students/:id/email', async (req, res) => {
    try {
        const updated = await studentRepository.updateEmail(Number(req.params.id), req.body.email);
        if (!updated) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/students/:id/password', async (req, res) => {
    try {
        const updated = await studentRepository.updatePassword(Number(req.params.id), req.body.password);
        if (!updated) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/students/:id/phone', async (req, res) => {
    try {
        const updated = await studentRepository.updatePhoneNumber(Number(req.params.id), req.body.phone_number);
        if (!updated) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/students/:id/student-id', async (req, res) => {
    try {
        const updated = await studentRepository.updateStudentId(Number(req.params.id), req.body.student_id);
        if (!updated) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/students/:id', async (req, res) => {
    try {
        const updated = await studentRepository.updateGlobalStudent(Number(req.params.id), req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.delete('/students/:id', async (req, res) => {
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