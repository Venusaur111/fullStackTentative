import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as process from "node:process";

const SECRET_KEY= process.env.JWT_SECRET_KEY || 'fallback_secret';
export class AuthUtils {
    hashPassword = async (password: string): Promise<string> => {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    generateToken = (student: {id: number; email: string}) => {
        return jwt.sign({id: student.id, email: student.email},
            SECRET_KEY,
            {expiresIn: '24h'});
    }
}
