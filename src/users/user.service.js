const User = require('../../db/User');


/**
 * Find_Users
 * @returns {Promise<Array<{id, firstName: String, lastName: String, email:String, password: String}>>}
 */
async function findUsers() {
  const users = await User.find();
  return users;
}

/**
 * Find_User
 * @param userId {String} ID for searching user
 * @returns {Promise<{id, firstName: String, lastName: String, email:String, password: String}>} User Object
 */
async function findUserById(userId) {
  const user = await User.findById(userId);
  return user;
}

/**
 * Create_User
 * @param firstName {String} User Name
 * @param lastName {String} User Surname
 * @param email {String} User Email
 * @param password {String} User PassWord
 * @returns {Promise<{id, firstName: String, lastName: String, email: String, password: String}>} Created User
 */
async function createUser({firstName, lastName, email, password}) {
  const user = {firstName, lastName, email, password};
  const newUser = await User.create(user);
  return newUser;
}

/**
 * Update_User
 * @param userId {String} ID for searching user
 * @param dataForUpdate {{firstName: String, lastName: String, email: String, password: String}} Data for update
 * @param options {{new: Boolean}} Return updated user
 * @returns {Promise<{id, firstName: String, lastName: String, password: String}>} Updated User
 */
async function updateOneUser(userId, dataForUpdate, options = {new: true}) {
  if (!dataForUpdate.firstName) {
    delete dataForUpdate.firstName;
  }
  if (!dataForUpdate.lastName) {
    delete dataForUpdate.lastName;
  }
  if (!dataForUpdate.email) {
    delete dataForUpdate.email;
  }
  if (!dataForUpdate.password) {
    delete dataForUpdate.password;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, dataForUpdate, options);
  return updatedUser;
}

/**
 * Delete_User
 * @param userId {String} ID for searching user
 * @returns {Promise<void>} Nothing for return
 */
async function deleteOneUser(userId) {
  await User.findByIdAndDelete(userId);
}


module.exports = {
  findUsers,
  findUserById,
  createUser,
  updateOneUser,
  deleteOneUser
}