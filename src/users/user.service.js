const path = require('node:path');

const fileService = require('../../services/file.service');

const pathToUsersDB = path.join(process.cwd(), "db", "users.json");


async function findUsers() {
  const users = await fileService.readFile(pathToUsersDB);
  if (!users) throw new Error('Users not found');
  // All errors will be caught in 'user.controller'
  return users;
}

async function findUserById(userId) {
  const users = await findUsers();

  for (const user of users) {
    if (user.id === Number(userId)) {
      return user;
    }
  }

  throw new Error("User doesn't exists");
}

async function createUser({firstName, lastName, email, password}) {
  // const users = [...await fileService.readFile(pathToUsersDB)];
  const users = [...await findUsers(pathToUsersDB)];
  const id = (!users.length) ? 1 : users[users.length - 1].id + 1;

  const newUser = {id, firstName, lastName, email, password};
  users.push(newUser);

  await fileService.writeFile(pathToUsersDB, users);
  return newUser;
}

async function updateOneUser(userId, dataForUpdate) {
  let userForUpdate = await findUserById(Number(userId));
  const users = await findUsers();

  const newUsers = users.map(user => {
    if (user.id === Number(userId)) {
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