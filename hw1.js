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
    {name: 'Mikos', gender: 'male', status: true},
    {name: 'Jhonny', gender: 'male', status: false},
    {name: 'Stiven', gender: 'male', status: false},
    {name: 'Pedro', gender: 'male', status: true},
    {name: 'Тітка Зіна', gender: 'female', status: true},
    {name: 'Вкрадена Дівчинка', gender: 'female', status: true},
];

const girls = [
    {name: 'Anfisa', gender: 'female', status: true},
    {name: 'Sasha', gender: 'female', status: false},
    {name: 'Aksinia', gender: 'female', status: true},
    {name: 'Frida', gender: 'female', status: false},
    {name: 'Хитрий Чел', gender: 'male', status: false},
    {name: 'Коханець', gender: 'male', status: true},
];

function putPersonsInFolder (persons = [], pathToFolder = ''){
    fs.mkdir(pathToFolder, {recursive: true}, (err) => {
        if (err) return console.log(err);

        for (const person of persons) {
            const pathToFile = path.join(pathToFolder, `${person.name}.txt`);
            fs.writeFile(pathToFile, JSON.stringify(person), (err) => {
                if (err) console.log(err);
            })
        }
    })
}

function moveFakeFromTo (fakeGender = 'male', pathFromFolder = '', pathToFolder = ''){
    fs.readdir(pathFromFolder, (err, data) => {
        if (err) return console.log(err);

        for (const element of data) {
            const pathToFile = path.join(pathFromFolder, element);

            fs.readFile(pathToFile, (err, data) => {
                if (err) return console.log(err);

                const person = JSON.parse(data.toString());
                if (person.gender == fakeGender) {
                    // console.log(person.name, 'is IMPOSTER');

                    const newPathToFile = path.join(pathToFolder, element)
                    fs.rename(pathToFile, newPathToFile, (err) => {
                        if (err) return console.log(err);
                    })
                }
            })
        }
    })
}


const girlsPath = path.join('HomeVideos', 'Girls');
const boysPath = path.join('HomeVideos', 'Boys');

putPersonsInFolder(girls, girlsPath);
putPersonsInFolder(boys, boysPath);

moveFakeFromTo('male', girlsPath, boysPath);
moveFakeFromTo('female', boysPath, girlsPath);

