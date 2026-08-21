import { dbPool } from '../config/db.js';
import { type User } from '../models/userModel.js';

export class UserRepository {

    async findAll(): Promise<User[]> {
        const query = "SELECT u.id, u.name, u.email, u.phone_number, u.created_at FROM users u ORDER BY u.id DESC";
        const result = await dbPool.query(query);
        return result.rows;
    }

    async findOneUserById(id: number): Promise<User | null> {
        const query = "SELECT u.id, u.name, u.email, u.phone_number, u.created_at FROM users u WHERE u.id = $1";
        const result = await dbPool.query(query, [id]);
        return result.rows[0] || null;
    }

    async createUser(user: User): Promise<User | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const userQuery = "INSERT INTO users (name, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING *";
            const userValues = [user.name, user.email, user.password, user.phone_number];
            const userResult = await client.query(userQuery, userValues);

            await client.query('COMMIT');
            return userResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updateUserName(id: number, name: string): Promise<User | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');
            const userQuery = "UPDATE users SET name = $1 WHERE id = $2 RETURNING *;";
            const userValues = [name, id];
            const userResult = await client.query(userQuery, userValues);

            if(userResult.rows.length === 0){
                await client.query('ROLLBACK');
                return null;
            }

            await client.query('COMMIT');
            return userResult.rows[0];
        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally {
            client.release();
        }
    }

    async updateUserEmail(id: number, email: string): Promise<User | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');
            const userQuery = "UPDATE users SET email = $1 WHERE id = $2 RETURNING *;";
            const userValues = [email, id];
            const userResult = await client.query(userQuery, userValues);

            if(userResult.rows.length === 0){
                await client.query('ROLLBACK');
                return null;
            }

            await client.query('COMMIT');
            return userResult.rows[0];
        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally {
            client.release();
        }
    }

    async updateUserPassword(id: number, password: string): Promise<User | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');
            const userQuery = "UPDATE users SET password = $1 WHERE id = $2 RETURNING *;";
            const userValues = [password, id];
            const userResult = await client.query(userQuery, userValues);

            if(userResult.rows.length === 0){
                await client.query('ROLLBACK');
                return null;
            }

            await client.query('COMMIT');
            return userResult.rows[0];
        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally {
            client.release();
        }
    }

    async updateUserPhoneNumber(id: number, phone_number: string): Promise<User | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');
            const userQuery = "UPDATE users SET phone_number = $1 WHERE id = $2 RETURNING *;";
            const userValues = [phone_number, id];
            const userResult = await client.query(userQuery, userValues);

            if(userResult.rows.length === 0){
                await client.query('ROLLBACK');
                return null;
            }

            await client.query('COMMIT');
            return userResult.rows[0];
        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally {
            client.release();
        }
    }

    async updateGlobalUser(id: number, user: User): Promise<User | null> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');
            const userQuery = "UPDATE users SET name = $1, email = $2, password = $3, phone_number = $4 WHERE id = $5 RETURNING *;";
            const userValues = [user.name, user.email, user.password, user.phone_number, id];
            const userResult = await client.query(userQuery, userValues);

            if(userResult.rows.length === 0){
                await client.query('ROLLBACK');
                return null;
            }

            await client.query('COMMIT');
            return userResult.rows[0];
        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally {
            client.release();
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const checkQuery = "SELECT id FROM users WHERE id = $1";
            const checkResult = await client.query(checkQuery, [id]);
            if (checkResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return false;
            }
            const userQuery = "DELETE FROM users WHERE id = $1";
            const userValues = [id];
            const userResult = await client.query(userQuery, userValues);
            await client.query('COMMIT');
            return (userResult.rowCount ?? 0) > 0;
        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally {
            client.release();
        }
    }
}