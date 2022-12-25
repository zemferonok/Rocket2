const userRouter = require('express').Router();

const controller = require('./user.controller.js');

userRouter.get('/', controller.getAllUsers);
userRouter.post('/', controller.createUser);
userRouter.get('/:userId', controller.getUserById);
userRouter.put('/:userId', controller.updateUserById);
userRouter.delete('/:userId', controller.deleteUserById);

module.exports = userRouter;