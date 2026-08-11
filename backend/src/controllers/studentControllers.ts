import  { Request, Response, NextFunction} from 'express';
import * as studentRepo from '../repositories/studentRepository.ts';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const students = await studentRepo.findAll();
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const studentId = req.params.id;
        const student = await studentRepo.findById(studentId);
        if(!student){
            return res.status(404).json({message: 'Student not found'});
        }
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};