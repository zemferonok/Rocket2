const userRouter = require('express').Router();

const controller = require('./user.controller.js');
const middleware = require('./user.middleware');

userRouter.get('/', controller.getAllUsers);
userRouter.post('/',
    middleware.isEmailExist,
    middleware.isEmailValid,
    middleware.isPasswordValid,
    controller.createUser);

userRouter.use('/:userId', middleware.isUserExists);

userRouter.get('/:userId', controller.getUserById);
userRouter.put('/:userId', controller.updateUserById);
userRouter.delete('/:userId', controller.deleteUserById);

module.exports = userRouter;