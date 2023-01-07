const User = require('../../dataBase/User');


module.exports = {
    findUsers: async (params = {}) => {
        return User.find(params);
    },
    findOneUser: async (params = {}) => {
        return User.findOne(params);
    },
    createUser: async (user) => {
        return User.create(user);
    },
    updateOneUser: async (params, newUserData, options = { new: true }) => {
        return User.findOneAndUpdate(params, newUserData, options);
    },
    deleteOneUser: async (params = {}) => {
        return User.deleteOne(params);
    },
}