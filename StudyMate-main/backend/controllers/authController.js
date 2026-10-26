import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isMongoConnected } from '../config/db.js';
import { memoryStore } from '../utils/memoryStore.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'studymate_super_secret_jwt_key_2026_workshop', {
    expiresIn: '30d'
  });
};

/**
 * @desc    Register new student
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    if (isMongoConnected()) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'An account with this email address already exists' });
      }

      const user = await User.create({ name, email, password });

      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          token: generateToken(user._id)
        }
      });
    } else {
      // In-Memory Fallback Mode
      const userExists = await memoryStore.findUserByEmail(email);
      if (userExists) {
        return res.status(400).json({ success: false, message: 'An account with this email address already exists' });
      }

      const user = await memoryStore.createUser({ name, email, password });

      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          token: generateToken(user._id)
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both email and password' });
    }

    if (isMongoConnected()) {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.status(200).json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            token: generateToken(user._id)
          }
        });
      }
    } else {
      // In-Memory Fallback Mode
      const user = await memoryStore.findUserByEmail(email);
      if (user && (await user.matchPassword(password))) {
        return res.status(200).json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            token: generateToken(user._id)
          }
        });
      }
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const user = await User.findById(req.user._id).select('-password');
      return res.status(200).json({ success: true, data: user });
    } else {
      const user = await memoryStore.findUserById(req.user._id);
      const { password, ...userWithoutPassword } = user;
      return res.status(200).json({ success: true, data: userWithoutPassword });
    }
  } catch (error) {
    next(error);
  }
};
