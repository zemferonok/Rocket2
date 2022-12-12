const fs = require('node:fs');
const path = require('node:path');
const util = require('node:util');  // CallBack >> Promise


fs.mkdir('./Dir/Trash', {recursive: true}, (err) => {
    if (err) return console.log(err);
})

fs.readdir('./Dir', (err, data) => {
    if (err) return console.log(err);
    console.log(data);
})

fs.readdir('./Dir', {withFileTypes: true}, (err, data) => {
    if (err) return console.log(err);
    for (const element of data) {
        console.log(element.name, 'is File', element.isFile());
    }
})

fs.rmdir('./Dir', {recursive: true}, (err) => {
    if (err) console.log(err);
});



const pathToFile = path.join(__dirname, 'Dir', 'data.txt');

fs.writeFile(pathToFile, 'First string', (err) => {
    if (err) console.log(err);
})  // Will create File if it not exitsts

fs.appendFile(pathToFile, '\n' + 'Added string', (err) => {
    if (err) console.log(err);
})  // Will create File if it not exitsts

fs.readFile(pathToFile, (err, data) => {
    if (err) return console.log(err);
    console.log(data.toString());
})

fs.truncate(pathToFile, (err) => {
    if (err) return console.log(err);
    console.log('File was cleared')
})

const newPathToFile = path.join(__dirname, 'Dir', 'Trash', 'badData.txt');

fs.rename(pathToFile, newPathToFile, (err) => {
    if (err) return console.log(err);
    console.log('The file was moved and renamed');
})

fs.unlink(newPathToFile, (err) => {
    if (err) return console.log(err);
    console.log('File was deleted');
})



// ASYNC та AWAIT працює лише з Promices.
// Воно очікує на поверненя обіцянки.
// Використовується для синхронізації
// і очікування асинхронних функцій.

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const rmdir = util.promisify(fs.rmdir);
const setTimeoutP = util.promisify(setTimeout);

async function makeMagic() {
    await setTimeoutP(1000).then(() => console.log('Dir is making..'))
    await setTimeoutP(3000).then(() => console.log('Dir is maked'))

    await mkdir('./Dir/Trash', {recursive: true})
        .catch(error => console.log(err))

    await setTimeoutP(3000).then(() => console.log('File is making..'))
    await setTimeoutP(3000).then(() => console.log('File is maked'))

    const pathToFile = path.join(__dirname, 'Dir', 'data.txt');
    await writeFile(pathToFile, 'First string')
        .catch(error => console.log(err))

    await setTimeoutP(3000).then(() => console.log('Dir is reading..'))
    await setTimeoutP(3000).then(() => console.log('Dir is read'))

    await readdir('./Dir')
        .then(data => console.log(data))
        .catch(error => console.log(err))

    await setTimeoutP(3000).then(() => console.log('All is delliting..'))
    await setTimeoutP(3000).then(() => console.log('All is deleted'))

    await rmdir('./Dir', {recursive: true})
        .catch(error => console.log(err));
}

makeMagic()