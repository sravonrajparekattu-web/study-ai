import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isMongoConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

/**
 * Middleware to protect private routes.
 * Supports both MongoDB Atlas and In-Memory demo store.
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'studymate_super_secret_jwt_key_2026_workshop');

      let user;
      if (isMongoConnected()) {
        user = await User.findById(decoded.id).select('-password');
      } else {
        user = await memoryStore.findUserById(decoded.id);
      }

      if (!user) {
        return res.status(401).json({ success: false, message: 'User account no longer exists' });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('Auth Middleware Error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no authentication token provided' });
  }
};
