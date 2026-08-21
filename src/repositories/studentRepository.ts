import { dbPool } from '../config/db.js';
import { type Student } from '../models/studentModel.js';
import { UserRepository } from './userRepository.js';

export class StudentRepository {
    private userRepository = new UserRepository();

    async findAll(): Promise<Student[]> {
        const query = `
            SELECT s.id, s.student_id, s.user_id, u.name, u.email, u.phone_number, u.created_at 
            FROM students s 
            JOIN users u ON s.user_id = u.id 
            ORDER BY s.id DESC
        `;
        const result = await dbPool.query(query);
        return result.rows;
    }

    async findStudentById(id: number): Promise<Student | null> {
        const query = `
            SELECT s.id, s.student_id, s.user_id, u.name, u.email, u.phone_number, u.created_at 
            FROM students s 
            JOIN users u ON s.user_id = u.id 
            WHERE s.id = $1
        `;
        const result = await dbPool.query(query, [id]);
        return result.rows[0] || null;
    }

    async create(student: Student): Promise<Student | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const createdUser = await this.userRepository.createUser(student);
            if (!createdUser || !createdUser.id) {
                await client.query('ROLLBACK');
                return null;
            }

            const studentQuery = 'INSERT INTO students (user_id, student_id) VALUES ($1, $2) RETURNING *';
            const studentValues = [createdUser.id, student.student_id];
            const studentResult = await client.query(studentQuery, studentValues);

            await client.query('COMMIT');

            return {
                id: studentResult.rows[0].id,
                user_id: createdUser.id,
                student_id: studentResult.rows[0].student_id,
                name: createdUser.name,
                email: createdUser.email,
                password: createdUser.password,
                phone_number: createdUser.phone_number,
                created_at: createdUser.created_at
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    private async findUserIdByStudentId(client: any, studentId: number): Promise<number | null> {
        const query = 'SELECT user_id FROM students WHERE id = $1';
        const result = await client.query(query, [studentId]);
        return result.rows[0]?.user_id || null;
    }

    async updateName(id: number, name: string): Promise<Student | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const userId = await this.findUserIdByStudentId(client, id);
            if (!userId) {
                await client.query('ROLLBACK');
                return null;
            }

            await this.userRepository.updateUserName(userId, name);
            await client.query('COMMIT');

            return await this.findStudentById(id);
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updateEmail(id: number, email: string): Promise<Student | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const userId = await this.findUserIdByStudentId(client, id);
            if (!userId) {
                await client.query('ROLLBACK');
                return null;
            }

            await this.userRepository.updateUserEmail(userId, email);
            await client.query('COMMIT');

            return await this.findStudentById(id);
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updatePassword(id: number, password: string): Promise<Student | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const userId = await this.findUserIdByStudentId(client, id);
            if (!userId) {
                await client.query('ROLLBACK');
                return null;
            }

            await this.userRepository.updateUserPassword(userId, password);
            await client.query('COMMIT');

            return await this.findStudentById(id);
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updatePhoneNumber(id: number, phone_number: string): Promise<Student | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const userId = await this.findUserIdByStudentId(client, id);
            if (!userId) {
                await client.query('ROLLBACK');
                return null;
            }

            await this.userRepository.updateUserPhoneNumber(userId, phone_number);
            await client.query('COMMIT');

            return await this.findStudentById(id);
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updateStudentId(id: number, student_id: string): Promise<Student | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const query = 'UPDATE students SET student_id = $1 WHERE id = $2 RETURNING *';
            const result = await client.query(query, [student_id, id]);

            if (result.rows.length === 0) {
                await client.query('ROLLBACK');
                return null;
            }

            await client.query('COMMIT');
            return await this.findStudentById(id);
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updateGlobalStudent(id: number, student: Student): Promise<Student | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const userId = await this.findUserIdByStudentId(client, id);
            if (!userId) {
                await client.query('ROLLBACK');
                return null;
            }

            await this.userRepository.updateGlobalUser(userId, student);

            const studentQuery = 'UPDATE students SET student_id = $1 WHERE id = $2 RETURNING *';
            await client.query(studentQuery, [student.student_id, id]);

            await client.query('COMMIT');
            return await this.findStudentById(id);
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async delete(id: number): Promise<boolean> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const userId = await this.findUserIdByStudentId(client, id);
            if (!userId) {
                await client.query('ROLLBACK');
                return false;
            }

            await client.query('DELETE FROM students WHERE id = $1', [id]);
            await this.userRepository.deleteUser(userId);

            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}