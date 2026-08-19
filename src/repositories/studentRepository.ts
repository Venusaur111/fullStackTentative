import { dbPool } from '../config/db.ts';
import { type Student } from '../models/student.model.ts';

export class StudentRepository{
    async findAll(): Promise<Student[]>{
        const result= await dbPool.query('SELECT * FROM students ORDER BY id');
        return result.rows;
    }
    async findById(id: string): Promise<Student | null>{
        const result = await dbPool.query('SELECT * FROM students WHERE id=$1', [id]);
        return result.rows[0] || null;
    }
    async create(student: Student): Promise<Student | null>{
        const {name, email, password, phone_number} = student;
        const query = 'INSERT INTO students (name, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, email, password, phone_number];
        const result = await dbPool.query(query, values);
        return result.rows[0];
    }
    async updateName(id: number, name: string): Promise<Student | null>{
        const query = 'UPDATE students SET name=$1 WHERE id=$2 RETURNING *';
        const result = await dbPool.query(query, [name, id]);
        return result.rows[0] || null;
    }
    async updateEmail(id: number, email: string): Promise<Student | null>{
        const query = 'UPDATE students SET email= $1 WHERE id=$2 RETURNING *';
        const result = await dbPool.query(query, [email, id]);
        return result.rows[0] || null;
    }
    async updatePassword(id: number, password: string): Promise<Student | null>{
        const query = 'UPDATE students SET password=$1 WHERE id=$2 RETURNING *';
        const result = await dbPool.query(query, [password, id]);
        return result.rows[0] || null;
    }
    async updatePhoneNumber(id: number, phone_number: string): Promise<Student | null>{
        const query = 'UPDATE students SET phone_number=$1 WHERE id=$2 RETURNING *';
        const result = await dbPool.query(query, [phone_number, id]);
        return result.rows[0] || null;
    }
    async delete(id: string): Promise<boolean> {
        const result = await dbPool.query('DELETE FROM students WHERE id=$1', [id]);
        return (result.rowCount  ?? 0) > 0;
    }
}