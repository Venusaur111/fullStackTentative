import { dbPool } from '../config/db.js';
import { type Student } from '../models/studentModel.js';

export class StudentRepository {

    async findAll(): Promise<Student[]> {
        const query = "SELECT s.id, s.student_id, s.user_id, u_name, u.email, u.phone_number, u.created_at" +
            "FROM students s" +
            "JOIN users u ON s.user_id = u.user_id" +
            "ORDER BY s.id";
        const result = await dbPool.query(query);
        return result.rows;
    }
    async create(student: Student): Pormise<Student | null> {
        const client = await dbPool.connect();
        try{
            await client.query('BEGIN');

            const userQuery = 'INSERT INTO users (name, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING id';
            const userValues = [student.name, student.email, student.password, student.phone_number];
            const userResult = await client.query(userQuery, userValues);
            const userId = userResult.rows[0].id;

            const studentQuery = 'INSERT INTO students (user_id, student_id) VALUES ($1, $2) RETURNING *';
            const studentValues = [userId, student.student_id];
            const studentResult = await client.query(studentValues, userValues);

            await client.query('COMMIT');

            return {
                ...studentResult.rows[0],
                name: student.name,
                email: student.email
            };
        }catch(error){
            await client.query('ROOLBACK');
            throw error;
        }finally {
            client.release();
        }
    }

    async updateName(id: number, name: string): Promise<Student | null> {
        const client = await dbPool.connect();
        try{
            await client.query('BEGIN');

            const userQuery= "" +
                "UPDATE users SET name = $1 FROM students WHERE users.id = students.user_id AND student.id = $2 RETURNING users.*";
            const userResult = await client.query(userQuery, [name, id]);
            if(userResult.rows.length === 0){
                return null;
            }

            const studentQuery = 'SELECT s.id, s.student_id, s.user_id, u_name, u.email, u.phone_number, u.created_at FROM students s JOIN users u on s.user_id = u.id WHERE s.id = $1'
            const result  = await client.query(studentQuery, [id]);

            await client.query('COMMIT');
            return result.rows[0] || null;
        }catch(error){
            await client.query('ROOLBACK');
            throw error;
        }finally {
            client.release();
        }
    }
}