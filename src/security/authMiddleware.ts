import { type Request, type Response, type NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import * as process from "node:process";
//email, id, role
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'fallback_secret';

export interface AuthenticateRequest extends Request {
    student?: any;
}

export const verifyToken = (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Unauthorized : No token provided'});
    }
    try{
        const verified = jwt.verify(token, SECRET_KEY);
        req.student = verified;
        next();
    }catch(error){
        return res.status(403).json({message: 'Invalid tokken'})
    }
};