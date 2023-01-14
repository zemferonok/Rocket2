const fs = require('node:fs');
const path = require('node:path');


function mkDir(pathToFolder) {
  fs.mkdir(pathToFolder, {recursive: true}, (err) => {
    if (err) return console.log(err);
  });
}

function readDir(pathToFolder) {
  fs.readdir(pathToFolder, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
  });
}

function readDirAdv(pathToFolder) {
  fs.readdir(pathToFolder, {withFileTypes: true}, (err, data) => {
    if (err) return console.log(err);
    console.log(data);

    for (const element of data) {
      console.log(element.name, 'is File', element.isFile());
    }
  });
}

function rmDir(pathToFolder) {
  fs.rmdir(pathToFolder, {recursive: true}, (err) => {
    if (err) console.log(err);
  });
}

function writeFile(pathToFile, dataForWrite) {
  fs.writeFile(pathToFile, dataForWrite, (err) => {
    if (err) console.log(err);
  });
} // Will create File if it not exists

function appendFile(pathToFile, dataForAppend) {
  fs.appendFile(pathToFile, '\n' + dataForAppend, (err) => {
    if (err) console.log(err);
  });
} // Will create File if it not exists

function readFile(pathToFile) {
  fs.readFile(pathToFile, (err, data) => {
    if (err) return console.log(err);
    console.log(data.toString());
  });
}

function clearFile(pathToFile) {
  fs.truncate(pathToFile, (err) => {
    if (err) return console.log(err);
    console.log('File was cleared')
  });
}

function moveFile(pathToFile, newPathToFile) {
  fs.rename(pathToFile, newPathToFile, (err) => {
    if (err) return console.log(err);
    console.log('The file was moved and renamed');
  });
}

function rmFile(pathToFile) {
  fs.unlink(pathToFile, (err) => {
    if (err) return console.log(err);
    console.log('File was deleted');
  });
}


// const pathToFolder = './Dir';
// const pathToFolderAdv = './Dir/Trash';
// const pathToFile = './Dir/file.txt';
// const newPathToFile = './Dir/Trash/badFile.txt';

// mkDir(pathToFolderAdv);
// readDir(pathToFolder);
// readDirAdv(pathToFolder);
// rmDir(pathToFolder);

// writeFile(pathToFile);
// appendFile(pathToFile);
// readFile(pathToFile);
// clearFile(pathToFile);
// moveFile(pathToFile, newPathToFile);
// rmFile(newPathToFile);


console.log(__dirname, '__dirname');
console.log(__filename, '__filename');

const pathToFolder = path.join(__dirname, 'Dir');
const pathToFolderAdv = path.join(pathToFolder, 'Trash');
const pathToFile = path.join(pathToFolder, 'file.txt');
const newPathToFile = path.join(pathToFolderAdv, 'badFile.txt');
const dataForWrite = 'First String';
const dataForAppend = 'Appended String';

setTimeout(() => {
  console.log('mkDir');
  mkDir(pathToFolderAdv);
}, 1000);
setTimeout(() => {
  console.log('writeFile');
  writeFile(pathToFile, dataForWrite);
}, 2000);
setTimeout(() => {
  console.log('readDir');
  readDir(pathToFolder);
}, 3000);
setTimeout(() => {
  console.log('readDirAdv');
  readDirAdv(pathToFolder);
}, 4000);
setTimeout(() => {
  console.log('appendFile');
  appendFile(pathToFile, dataForAppend);
}, 5000);
setTimeout(() => {
  console.log('readFile');
  readFile(pathToFile);
}, 6000);
setTimeout(() => {
  console.log('clearFile');
  clearFile(pathToFile);
}, 7000);
setTimeout(() => {
  console.log('moveFile');
  moveFile(pathToFile, newPathToFile);
}, 8000);
setTimeout(() => {
  console.log('rmFile');
  rmFile(newPathToFile);
}, 9000);
setTimeout(() => {
  console.log('rmDir');
  rmDir(pathToFolder);
}, 10000);