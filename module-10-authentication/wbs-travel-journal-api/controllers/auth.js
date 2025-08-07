import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signIn = async (req, res) => {
  const { email, password } = req.body;

  //Check if user exists
  let user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid Credentials', { cause: 400 });

  //Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid Credentials', { cause: 400 });

  const payload = { id: user._id, firstName: user.firstName };
  const jwtSecret = process.env.JWT_SECRET;
  const tokenOptions = { expiresIn: '7d' };

  //Generate a token
  const token = jwt.sign(payload, jwtSecret, tokenOptions);

  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: isProduction ? 'None' : 'Lax'
  };

  /*
  Mongoose documents (returned by User.findOne) have special properties and methods that aren’t present on regular objects.
  So we need to convert the mongoose documents to a regular JS object.
  Why? so we can use regular JS object delete option
  */
  user = user.toObject();
  delete user.password; // Delete password since its not needed for client

  //This will include an instruction to the browser to store a cookie called token.
  res.cookie('token', token, cookieOptions);
  // res.json({ message: 'user logged in' }) //We dont send just a message but the user document itself.
  res.json(user);
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  //First make sure if user does not already exist
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists', { cause: 400 });

  //Hash the password before saving it in the DB
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  //Send back the newly created user to the client.
  //You could also send some other message if you wish. Depends on the app
  res.json(newUser);
};

const signOut = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: isProduction ? 'None' : 'Lax'
  };

  //This will send an instruction to the browser to clear a cookie called token
  res.clearCookie('token', cookieOptions);
  res.status(200).json({ message: 'Goodbye' });
};

const me = async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) throw new Error('User does not exist', { cause: 404 });

  res.json(user);
};

export { signIn, signUp, signOut, me };
