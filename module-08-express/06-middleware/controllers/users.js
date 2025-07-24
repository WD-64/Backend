import User from '../models/User.js';
import Note from '../models/Note.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Note });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName)
      return res.json({ message: 'First name and last name is required' });

    const newUser = await User.create(req.body);

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, { include: Note });
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
      params: { id },
    } = req;

    if (!firstName || !lastName || !email)
      return res
        .status(400)
        .json({ error: 'firstName, lastName, and email are required' });

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
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllUsers, createUser, getUserById, updateUser, deleteUser };
