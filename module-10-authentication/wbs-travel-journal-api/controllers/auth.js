import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signIn = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid Credentials', { cause: 400 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid Credentials', { cause: 400 });

  const payload = { id: user._id, firstName: user.firstName };
  const jwtSecret = process.env.JWT_SECRET;
  const tokenOptions = { expiresIn: '7d' };

  const token = jwt.sign(payload, jwtSecret, tokenOptions);

  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: isProduction ? 'None' : 'Lax'
  };

  user = user.toObject(); //Converts mongodb object to regular JS object
  delete user.password; // Delete password since its not needed for client

  res.cookie('token', token, cookieOptions);
  // res.json({ message: 'user logged in' })
  res.json(user);
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists', { cause: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.json(newUser);
};

const signOut = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: isProduction ? 'None' : 'Lax'
  };

  res.clearCookie('token', cookieOptions);
  res.status(200).json({ message: 'Goodbye' });
};

export { signIn, signUp, signOut };
