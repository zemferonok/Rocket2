const userService = require("./user.service");

module.exports = {
    isUserExists: async (req, res, next) => {
        try {
            const user = await userService.findOneUser({_id: req.params.userId});

            if (!user) {
                throw new Error(`User ${req.params.userId} not found.`);
            }

            // req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailExist: async (req, res, next) => {
        try {
            const user = await userService.findOneUser({email: req.body.email});

            if (user) {
                throw new Error(`User with ${req.body.email} email already exists.`);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailValid: async (req, res, next) => {
        try {
            const valid = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(req.body.email)

            if (!valid) {
                throw new Error(`Email ${req.body.email} is invalid.`)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordValid: async (req, res, next) => {
        try {
            if (!req.body.password || req.body.password.length < 8) {
                throw new Error('Password must be 8 characters or more');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};