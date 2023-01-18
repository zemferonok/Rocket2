const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.updateUserById);
router.delete("/:userId", userController.deleteUser);

module.exports = router;