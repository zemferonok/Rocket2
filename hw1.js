const fs = require('node:fs');
const path = require('node:path');

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

function putPersonsInFolder(persons = [], pathToFolder = '') {
  fs.mkdir(pathToFolder, {recursive: true}, (err) => {
    if (err) return console.log(err);

    for (const person of persons) {
      const pathToFile = path.join(pathToFolder, `${person.name}.txt`);
      fs.writeFile(pathToFile, JSON.stringify(person, null, 2), (err) => {
        if (err) console.log(err);
      });
    }
  });
}

function moveFakeFromTo(fakeGender = 'male', pathFromFolder = '', pathToFolder = '') {
  fs.readdir(pathFromFolder, (err, data) => {
    if (err) return console.log(err);

    for (const element of data) {
      const pathToFile = path.join(pathFromFolder, element);

      fs.readFile(pathToFile, (err, data) => {
        if (err) return console.log(err);

        const person = JSON.parse(data.toString());
        if (person.gender === fakeGender) {
          // console.log(person.name, 'is IMPOSTER');

          const newPathToFile = path.join(pathToFolder, element);
          fs.rename(pathToFile, newPathToFile, (err) => {
            if (err) return console.log(err);
          });
        }
      });
    }
  });
}


const girlsPath = path.join('HomeVideos', 'Girls');
const boysPath = path.join('HomeVideos', 'Boys');

setTimeout(() => {
  console.log('putPersonsInFolder');
  putPersonsInFolder(girls, girlsPath);
  putPersonsInFolder(boys, boysPath);
}, 1000);

setTimeout(() => {
  console.log('moveFakeFromTo');
  moveFakeFromTo('male', girlsPath, boysPath);
  moveFakeFromTo('female', boysPath, girlsPath);
}, 10000);

setTimeout(()=>{
  console.log('rm HomeVideos')
  fs.rm('./HomeVideos', {recursive: true}, (err) => {
    if (err) console.log(err);
  });
}, 20000);