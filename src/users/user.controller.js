const userService = require('./user.service');

const getUsers = async (req, res) => {
  try {
    const users = await userService.findUsers();
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({message: e.message});
  }
};

const getUserById = async (req, res) => {
  try {
    // Getting 'userId' from link params
    // const userId = req.params.userId;
    const userId = Object.values(req.params);
    const user = await userService.findUserById(userId);
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({message: e.message});
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({message: e.message});
  }
};

const updateUserById = async (req, res) => {
  try {
    const updatedUser = await userService.updateOneUser(Object.values(req.params), req.body);
    res.status(202).json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(400).json({message: e.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteOneUser(Object.values(req.params));
    res.status(204).json('User deleted');
  } catch (e) {
    console.log(e);
    res.status(400).json({message: e.message});
  }
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserById,
};