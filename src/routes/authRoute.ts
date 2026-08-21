import { Router, type Request, type Response } from 'express';
import { dbPool } from '../config/db.js';
import bcrypt from 'bcrypt';
import { AuthUtils } from '../utils/authUtils.js';

const router = Router();
const authUtils = new AuthUtils();

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await dbPool.query(query, [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = authUtils.generateToken({ id: user.id, email: user.email });

        return res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
});

export const authRoutes = router;