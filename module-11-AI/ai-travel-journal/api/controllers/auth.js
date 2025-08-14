import { isValidObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import User from '../models/User.js';

const secret = process.env.JWT_SECRET;
const tokenOptions = { expiresIn: '6d' };
const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? 'None' : 'Lax',
  secure: isProduction
};

const signUp = async (req, res) => {
  const {
    sanitizedBody: { email, password }
  } = req;

  const found = await User.findOne({ email });

  if (found) throw new Error('Email already exists', { cause: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ ...req.sanitizedBody, password: hashedPassword });

  const payload = { userId: user._id, userRole: user.role || 'user' };

  const token = jwt.sign(payload, secret, tokenOptions);

  res.cookie('token', token, cookieOptions);

  res.status(201).json({ message: 'Welcome' });
};

const signIn = async (req, res) => {
  const {
    sanitizedBody: { email, password }
  } = req;

  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new Error('User not found', { cause: 404 });

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) throw new Error('Invalid email or password', { cause: 401 });

  const payload = { userId: user._id, userRole: user.role || 'user' };

  const token = jwt.sign(payload, secret, tokenOptions);

  res.cookie('token', token, cookieOptions);

  res.status(201).json({ message: 'Welcome back' });
};

const me = async (req, res) => {
  const { userId } = req;

  if (!isValidObjectId(userId)) throw new Error('Invalid id', { cause: 400 });

  const user = await User.findById(userId).lean();

  if (!user) throw new Error('User not found', { cause: 404 });

  res.json(user);
};

const signOut = async (req, res) => {
  res.clearCookie('token', cookieOptions);

  res.json({ message: 'You have signed out.' });
};

export { signUp, signIn, me, signOut };
