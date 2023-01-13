const User = require('../../dataBase/User');


module.exports = {
    /**
     *
     * @param params{Object} Key and value for search
     * @returns {Promise<Array<Object>>} Array of users
     * */
    findUsers: async (params = {}) => {
        return User.find(params);
    },
    /**
     *
     * @param params{Object} Key and value for search
     * @returns {Promise<Object>} Object of user
     * */
    findOneUser: async (params = {}) => {
        return User.findOne(params);
    },
    /**
     *
     * @param user {{name: String, email: String, role: String}}
     * @returns {Promise<Object>}
     */
    createUser: async (user) => {
        return User.create(user);
    },
    /**
     *
     * @param params {{}} Data for search user
     * @param newUserData {{name: String, email: String}} New data for user
     * @returns {Promise<Object>} Return updated user
     */
    updateOneUser: async (params, newUserData) => {
        const options = { new: true };
        return User.findOneAndUpdate(params, newUserData, options);
    },
    /**
     *
     * @param params {{}} Data for search user
     */
    deleteOneUser: async (params = {}) => {
        return User.deleteOne(params);
    },
}