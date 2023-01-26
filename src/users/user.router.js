const express = require('express');
const userController = require('./user.controller');
const userMiddleware = require("./user.middleware");

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/",
  userMiddleware.isEmailAndPasswordExist,
  userMiddleware.isInputDataValid,
  userController.createUser);

// General middleware for "/:userId" rout
router.use("/:userId", userMiddleware.isUserExist)

router.get("/:userId", userController.getUserById);
router.put("/:userId",
  userMiddleware.isInputDataValid,
  userController.updateUserById);
router.delete("/:userId", userController.deleteUser);

module.exports = router;