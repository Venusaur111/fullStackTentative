import { Router, type Request, type Response } from 'express';
import { StudentController } from '../controllers/studentController.js';

const route = Router();
const studentController = new StudentController();

route.get("/", async (req: Request, res: Response) => {
    return studentController.findAll(req, res);
});

route.get("/:id", async (req: Request, res: Response) => {
    return studentController.getStudentById(req, res);
});

route.put("/:id", async (req: Request, res: Response) => {
    return studentController.updateStudentName(req, res);
});

route.delete("/:id", async (req: Request, res: Response) => {
    return studentController.deleteStudentById(req, res);
});

route.post("/", async (req: Request, res: Response) => {
    return studentController.addStudent(req, res);
});

export default route;