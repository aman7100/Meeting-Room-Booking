import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/user';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('x-auth-token') as string;

    if (!authHeader) {
        console.log('No auth header provided');
        return res.sendStatus(401);
    }

    const token = authHeader;
    if (!token) {
        console.log('No token found in auth header');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: Error, user: { username: User }) => {
        if (err) {
            console.log('JWT verification error:', err);
            return res.sendStatus(403);
        }
        console.log('Verified user:', user.username);
        req.body.loggedUser = user.username;
        next();
    });
}

export default authenticateToken;