const fs = require('node:fs/promises');
const path = require('node:path');
const util = require('node:util');

/*Сортувальна Шляпа Хогвартса.
* Посортувати дітей по Факультетах.
*
* Кожна Дитина то є Файл з інфою про неї.
* Кожен Факультет це окрема Папка з файлами.
* Перемістити Дітей з Головного Залу до Кімнат Факультетів.
* Перемістити Гостей назад до Своїх Кімнат Факультету.*/

const boys = [
  {name: 'Ivan', gender: 'male', status: true},
  {name: 'John', gender: 'male', status: false},
  {name: 'Steven', gender: 'male', status: false},
  {name: 'Pedro', gender: 'male', status: true},
  {name: 'Alina', gender: 'female', status: true},
  {name: 'Olesia', gender: 'female', status: true},
];

const girls = [
  {name: 'Anfisa', gender: 'female', status: true},
  {name: 'Kristina', gender: 'female', status: false},
  {name: 'Julia', gender: 'female', status: true},
  {name: 'Frida', gender: 'female', status: false},
  {name: 'Bob', gender: 'male', status: false},
  {name: 'Karl', gender: 'male', status: true},
];

const setTimeoutP = util.promisify(setTimeout);

async function putPersonsInFolder(persons = [], pathToFolder = '') {
  await fs.mkdir(pathToFolder, {recursive: true})
    .catch(err => console.log(err));

  for (const person of persons) {   // Cycles can await, as opposed to forEach
    const pathToFile = path.join(pathToFolder, `${person.name}.txt`);
    await fs.writeFile(pathToFile, JSON.stringify(person, null, 2))
      .catch(err => console.log(err));
    await setTimeoutP(1000).then(() => console.log(person.name, ' has added'));
  }
}

async function moveFakeFromTo(fakeGender = 'male', pathFromFolder = '', pathToFolder = '') {
  const folderData = await fs.readdir(pathFromFolder)
    .catch(err => console.log(err));

  for (const folderFile of folderData) {
    const pathToFile = path.join(pathFromFolder, folderFile);
    const person = await fs.readFile(pathToFile)
      .then(data => JSON.parse(data.toString()))
      .catch(err => console.log(err));

    if (person.gender === fakeGender) {
      const newPathToFile = path.join(pathToFolder, folderFile);
      await fs.rename(pathToFile, newPathToFile)
        .catch(err => console.log(err));
    }
  }
}


const girlsPath = path.join('HomeVideos', 'Girls');
const boysPath = path.join('HomeVideos', 'Boys');

const go = async () => {
  console.log('putPersonsInFolder');
  await putPersonsInFolder(girls, girlsPath);
  await putPersonsInFolder(boys, boysPath);
  await setTimeoutP(10000).then();

  console.log('moveFakeFromTo');
  await moveFakeFromTo('male', girlsPath, boysPath);
  await moveFakeFromTo('female', boysPath, girlsPath);
  await setTimeoutP(10000).then();

  console.log('rm HomeVideos')
  await fs.rm('./HomeVideos', {recursive: true})
    .catch(err => console.log(err));
}

go().then();