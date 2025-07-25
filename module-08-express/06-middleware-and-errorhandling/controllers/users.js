import User from '../models/User.js';
import Post from '../models/Post.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const getUsers = async (req, res) => {
  const users = await User.findAll();
  if (!users.length) throw new ErrorResponse('No users available', 404);

  res.json(users);
};

const createUser = async (req, res) => {
  const {
    body: { firstName, lastName, email },
  } = req;

  if (!firstName || !lastName || !email)
    throw new ErrorResponse('firstName, lastName, and email are required', 400);

  const found = await User.findOne({ where: { email } });
  if (found) throw new ErrorResponse('User already exists', 400);
  const user = await User.create(req.body);

  res.json(user);
};

const getUserById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findByPk(id, { include: Post });
  if (!user) throw new ErrorResponse('User not found', 404);
  res.json(user);
};

const updateUser = async (req, res) => {
  const {
    body: { firstName, lastName, email },
    params: { id },
  } = req;

  if (!firstName || !lastName || !email)
    throw new ErrorResponse('firstName, lastName, and email are required', 400);

  const user = await User.findByPk(id);
  if (!user) throw new ErrorResponse('User not found', 404);
  await user.update(req.body);

  res.json(user);
};

const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;

  const user = await User.findByPk(id);
  if (!user) throw new ErrorResponse('User not found', 404);
  await user.destroy();

  res.json({ message: 'User deleted' });
};

export { createUser, getUserById, getUsers, updateUser, deleteUser };
