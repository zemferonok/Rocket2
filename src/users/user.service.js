const path = require('node:path');

const fileService = require('../../services/file.service');

const pathToUsersDB = path.join(process.cwd(), "db", "users.json");

/**
 * Find_Users
 * @returns {Promise<Array<{id:Number, firstName: String, lastName: String, email:String, password: String}>>}
 */
async function findUsers() {
  const users = await fileService.readFile(pathToUsersDB);
  if (!users) throw new Error('Users not found');
  return users;
}

/**
 * Find_User
 * @param userId {Number} ID for searching user
 * @returns {Promise<{id: Number, firstName: String, lastName: String, email:String, password: String}>} User Object
 */
async function findUserById(userId) {
  const users = await findUsers();

  for (const user of users) {
    if (user.id === userId) {
      return user;
    }
  }

  throw new Error("User doesn't exists");
}

/**
 * Create_User
 * @param firstName {String} User Name
 * @param lastName {String} User Surname
 * @param email {String} User Email
 * @param password {String} User PassWord
 * @returns {Promise<{id: Number, firstName: String, lastName: String, email: String, password: String}>} Created User
 // * @returns {Promise<{firstName, lastName, password, id, email}>} Created User without dataType details
 */
async function createUser({firstName, lastName, email, password}) {
  const users = await findUsers();

  const id = (!users.length) ? 1 : users[users.length - 1].id + 1;
  const newUser = {id, firstName, lastName, email, password};
  users.push(newUser);

  await fileService.writeFile(pathToUsersDB, users);
  return newUser;
}

/**
 * Update_User
 * @param userId {Number} ID for searching user
 * @param dataForUpdate {{firstName: String, lastName: String, email: String, password: String}} Data for update
 * @returns {Promise<{id: Number, firstName: String, lastName: String, password: String}>} Updated User
 */
async function updateOneUser(userId, dataForUpdate) {
  let userForUpdate = await findUserById(Number(userId));
  const users = await findUsers();

  const newUsers = users.map(user => {
    if (user.id === userId) {
      if (dataForUpdate?.firstName) {
        user.firstName = dataForUpdate.firstName;
      }
      if (dataForUpdate?.lastName) {
        user.lastName = dataForUpdate.lastName;
      }
      if (dataForUpdate?.email) {
        user.email = dataForUpdate.email;
      }
      if (dataForUpdate?.password) {
        user.password = dataForUpdate.password;
      }
      userForUpdate = user;
    }
    return user;
  });

  await fileService.writeFile(pathToUsersDB, newUsers);
  return userForUpdate;
}

/**
 * Delete_User
 * @param userId {Number} ID for searching user
 * @returns {Promise<void>} Nothing for return
 */
async function deleteOneUser(userId) {
  const imposter = await findUserById(Number(userId));
  const users = await findUsers();

  const newUsers = users.filter(user => user.id !== imposter.id);
  await fileService.writeFile(pathToUsersDB, newUsers);
}


module.exports = {
  findUsers,
  findUserById,
  createUser,
  updateOneUser,
  deleteOneUser
}