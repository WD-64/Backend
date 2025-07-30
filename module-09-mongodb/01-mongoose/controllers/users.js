import User from '../models/User.js';

export const getUsers = async (req, res) => {
  const allUsers = await User.find();

  res.json(allUsers);
};

export const createUser = async (req, res) => {
  const newUser = await User.create(req.sanitizedBody);

  res.json(newUser);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(id, req.sanitizedBody, {
    new: true,
  });

  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  res.json(deletedUser);
};
