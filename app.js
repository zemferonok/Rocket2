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



// TODO acync await for profisified FS functions