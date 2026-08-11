import { Router } from 'express';
import { getStudents, createStudent } from '../controllers/studentControllers':

const router = Router();

router.get('/students', getStudents);
router.post('/student', createStudent);

export default router;