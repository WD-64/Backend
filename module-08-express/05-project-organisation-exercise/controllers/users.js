import User from '../models/User.js';

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email }
    } = req;
    if (!firstName || !lastName || !email)
      return res.status(400).json({ error: 'firstName, lastName, and email are required' });
    const found = await User.findOne({ where: { email } });
    if (found) return res.status(400).json({ error: 'User already exists' });
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const user = await User.findByPk(id, { include: Post });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email },
      params: { id }
    } = req;
    if (!firstName || !lastName || !email)
      return res.status(400).json({ error: 'firstName, lastName, and email are required' });
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createUser, getUserById, getUsers, updateUser, deleteUser };
