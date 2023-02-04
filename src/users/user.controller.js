const userService = require('./user.service');


const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = Object.values(req.params).toString();
    const user = await userService.findUserById(userId);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const userId = Object.values(req.params).toString();
    const updatedUser = await userService.updateOneUser(userId, req.body);
    res.status(202).json(updatedUser);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = Object.values(req.params).toString();
    await userService.deleteOneUser(userId);
    // res.status(200).json('User deleted');
    res.status(204).json('User deleted');
  } catch (e) {
    next(e);
  }
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserById,
};