import { Router } from 'express';
import { UserRepository } from '../repositories/userRepository.js';

const router = Router();
const userRepository = new UserRepository();

router.get('/users', async (req, res) => {
    try {
        const users = await userRepository.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await userRepository.findOneUserById(Number(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.post('/users', async (req, res) => {
    try {
        const newUser = await userRepository.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/users/:id/name', async (req, res) => {
    try {
        const updated = await userRepository.updateUserName(Number(req.params.id), req.body.name);
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/users/:id/email', async (req, res) => {
    try {
        const updated = await userRepository.updateUserEmail(Number(req.params.id), req.body.email);
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/users/:id/password', async (req, res) => {
    try {
        const updated = await userRepository.updateUserPassword(Number(req.params.id), req.body.password);
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/users/:id/phone', async (req, res) => {
    try {
        const updated = await userRepository.updateUserPhoneNumber(Number(req.params.id), req.body.phone_number);
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const updated = await userRepository.updateGlobalUser(Number(req.params.id), req.body);
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const deleted = await userRepository.deleteUser(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export const userRoutes = router;