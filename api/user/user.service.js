const fs = require('node:fs')
const path = require("path");


const pathToUserDB = path.join(__dirname, 'user.database.json');
const readFile = async (pathToFile) => {
    const data = await fs.promises.readFile(pathToFile)
        .then(value => JSON.parse(value));
    return data;
}
const writeFile = async (pathToFile, data) => {
    await fs.promises.writeFile(pathToFile, JSON.stringify(data));
}


module.exports = {
    getAllUsers: async () => {
        const users = await readFile(pathToUserDB);
        return users;
    },

    getUserById: async (req) => {
        // console.log('req.params', req.params);
        const {userId} = req.params;

        const users = await readFile(pathToUserDB);
        for (const user of users) {
            if (user.id === Number(userId)) return user;
        }
        throw new Error('User not found');
    },

    createUser: async (req) => {
        // console.log('req.body', req.body);
        const {name, age, email} = req.body;

        let currentId = 1;
        const users = await readFile(pathToUserDB);
        for (const user of users) {
            if (user?.id > currentId) {
                currentId = user.id;
            }
        }
        const user = {id: currentId + 1, name, age, email};
        await writeFile(pathToUserDB, [...users, user]);
    },

    updateUserById: async (req) => {
        // console.log('req.params', req.params);
        const {userId} = req.params;

        const users = await readFile(pathToUserDB);
        const updatedUsers = await users.map(user => {
            if (user.id === Number(userId)) return {...user, ...req.body};
            return user;
        });
        await writeFile(pathToUserDB, updatedUsers);
    },

    deleteUserById: async (req) => {
        // console.log('req.params', req.params);
        const {userId} = req.params;

        const users = await readFile(pathToUserDB);
        const updatedUsers = users.filter(user => user.id !== Number(userId));
        await writeFile(pathToUserDB, updatedUsers);
    },
}