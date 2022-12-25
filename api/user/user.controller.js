const userService = require("./user.service");

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await userService.getUserById(req)
            res.status(200).json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            await userService.createUser(req);
            res.status(201).json('User created');
        } catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },

    updateUserById: async (req, res) => {
        try {
            await userService.updateUserById(req);
            res.status(200).json('User updated');
        }catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            await userService.deleteUserById(req);
            res.status(200).json('User deleted');
        }catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },
}