import { UserModel } from './userModel.js';

export interface StudentModel extends UserModel {
    student_id: string;
    user_id: number;
}