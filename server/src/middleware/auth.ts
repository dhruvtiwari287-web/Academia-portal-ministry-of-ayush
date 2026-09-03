import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';
import { db } from '../db/dataStore.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'STUDENT' | 'FACULTY' | 'MENTOR' | 'RECRUITER' | 'ADMIN';
    firstName: string;
    lastName: string;
  };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    // If demo mode or test header provided, fallback to demo student or requested demo user
    const demoRole = req.headers['x-demo-role'] as string;
    if (demoRole) {
      const demoUser = db.users.find(u => u.role === demoRole.toUpperCase());
      if (demoUser) {
        req.user = {
          id: demoUser.id,
          email: demoUser.email,
          role: demoUser.role,
          firstName: demoUser.firstName,
          lastName: demoUser.lastName
        };
        return next();
      }
    }
    return res.status(401).json({ success: false, message: 'Authentication required. Missing token.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
}

export function requireRole(roles: Array<'STUDENT' | 'FACULTY' | 'MENTOR' | 'RECRUITER' | 'ADMIN'>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized. Please sign in.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' cannot access this restricted endpoint. Required: ${roles.join(', ')}`
      });
    }
    next();
  };
}
