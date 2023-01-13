const userService = require("./user.service");

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers();
            res.status(200).json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await userService.findOneUser({_id: req.params.userId});
            res.status(200).json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },

    updateUserById: async (req, res) => {
        try {
            const user = await userService.updateOneUser({_id: req.params.userId}, req.body);
            res.status(202).json(user);
        }catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            // await userService.deleteOneUser({_id: Object.values(req.params)});
            await userService.deleteOneUser({_id: req.params.userId});
            res.status(204).json('User deleted');
        }catch (e) {
            console.log(e);
            res.status(400).json(e.message);
        }
    },
}