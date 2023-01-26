const ApiError = require('../../errors/ApiError');
const userService = require("./user.service");

/**
 // * For fixing alert in "user.router.js"
 * @returns {void}
 */
const isUserExist = async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    const userId = Number(Object.values(req.params));

    const user = users.find(user => user.id === userId);
    if (!user) throw new ApiError.NotFound('User doesn\'t exists');

    // req.user = user;  // TODO Reduce MongoDB requests
    next();
  } catch (e) {
    next(e);
  }
};

const isEmailAndPasswordExist = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new ApiError.BadRequest('Email and password is required');
    }
    next();
  } catch (e) {
    next(e);
  }
};

const isInputDataValid = async (req, res, next) => {
  try {
    const firstName = req.body?.firstName;
    const lastName = req.body?.lastName;
    const email = req.body?.email;
    const password = req.body?.password;

    if (firstName && (firstName.length <= 2 || firstName.length >= 20)) {
      throw new ApiError.BadRequest('First name is not valid');
    }
    if (lastName && (lastName.length <= 2 || lastName.length >= 20)) {
      throw new ApiError.BadRequest('Last name is not valid');
    }
    if (email && (email.length <= 8 || !email.includes('@') || !email.includes('.'))) {
      throw new ApiError.BadRequest('Email is not valid');
    }
    if (password && password.length < 8) {
      throw new ApiError.BadRequest('Password is not valid');
    }

    const users = await userService.findUsers();
    users.forEach(user => {
      if (user.email === email) throw new ApiError.BadRequest('Email is already exist');
    });

    next();
  } catch (e) {
    next(e);
  }
};


module.exports = {
  isUserExist, isEmailAndPasswordExist, isInputDataValid
};