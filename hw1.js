const fs = require('node:fs');
const path = require('node:path');
const util = require('node:util');

/*Сортувальна Шляпа Хогвартса.
* Посортувати дітей по Факультетах.
*
* Кожна Дитина то є Файл з інфою про неї.
* Кожен Факультет це окрема Папка з файлами.
* Перемістити Дітей з Головного Залу до Кімнат Факультетів.
* Перемістити Гостей назад до Своїх Кімнат Факультету.*/


const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const rmdir = util.promisify(fs.rmdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const rename = util.promisify(fs.rename);
const setTimeoutP = util.promisify(setTimeout);

const boys = [
    {name: 'Mikos', gender: 'male', status: true},
    {name: 'Jhonny', gender: 'male', status: false},
    {name: 'Stiven', gender: 'male', status: false},
    {name: 'Pedro', gender: 'male', status: true},
    {name: 'Grey Sasha', gender: 'female', status: true},
    {name: 'Mononoke', gender: 'female', status: true},
];

const girls = [
    {name: 'Anfisa', gender: 'female', status: true},
    {name: 'Sasha', gender: 'female', status: false},
    {name: 'Aksinia', gender: 'female', status: true},
    {name: 'Frida', gender: 'female', status: false},
    {name: 'Spider Man', gender: 'male', status: false},
    {name: 'Gachi Boy', gender: 'male', status: true},
];


async function putPersonsInFolder(persons, pathToFolder) {
    await mkdir(pathToFolder, {recursive: true})
        .catch(error => console.log(err))
    await setTimeoutP(1000).then(() => console.log(pathToFolder, ' has created'))

    for (const person of persons) {     // Instead of forEach it can await
        const pathToFile = path.join(pathToFolder, `${person.name}.txt`);
        await writeFile(pathToFile, JSON.stringify(person))
            .catch(err => console.log(err))
        await setTimeoutP(1000).then(() => console.log(person.name, ' has added'))
    }
}


async function moveFakeFromTo(fakeGender, pathFromFolder, pathToFolder) {
    const foldersData = await readdir(pathFromFolder)
        .catch(err => console.log(err))
    await setTimeoutP(1000).then(() => console.log(pathFromFolder, foldersData))

    for (const foldersFile of foldersData) {
        const pathToFile = path.join(pathFromFolder, foldersFile);
        const person = await readFile(pathToFile)
            .then(data => JSON.parse(data))
            .catch(err => console.log(err))
        await setTimeoutP(1000).then(() => console.log(person))

        if (person.gender == fakeGender) {
            await setTimeoutP(1000).then(() => console.log(person.name, 'is IMPOSTER'))
            const newPathToFile = path.join(pathToFolder, foldersFile)
            await rename(pathToFile, newPathToFile)
                .catch(err => console.log(err))
            await setTimeoutP(1000).then(() => console.log(person.name, ' moved..'))
        }
    }
}


const girlsPath = path.join('HomeVideos', 'Girls');
const boysPath = path.join('HomeVideos', 'Boys');

const magic = async () => {
    await putPersonsInFolder(girls, girlsPath);
    await putPersonsInFolder(boys, boysPath);
    await moveFakeFromTo('male', girlsPath, boysPath);
    await moveFakeFromTo('female', boysPath, girlsPath);
    await setTimeoutP(1000).then(() => console.log('Magic is over.'))
}

console.log('The HW1 welcomes you.\nPlease use a Magic.')

module.exports = {
    magic,
}