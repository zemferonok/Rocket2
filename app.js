const fs = require('node:fs');
const path = require('node:path');
const util = require('node:util');


/*
 * Async, Await та Promises.
 * Async активує режим очікування у функції.
 * Await очікує на поверненя обіцянки функії.
 * Використовується для синхронізації дій
 * і очікування асинхронних дій функцій.
 */


async function mkDir(pathToFolder) {
  await fs.promises.mkdir(pathToFolder, {recursive: true})
    .catch(err => console.log(err));
}

async function readDir(pathToFolder) {
  await fs.promises.readdir(pathToFolder)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

async function readDirAdv(pathToFolder) {
  await fs.promises.readdir(pathToFolder, {withFileTypes: true})
    .then(data => {
      console.log(data);
      data.forEach(value => console.log(value.name, 'is File', value.isFile()));
    })
    .catch(err => console.log(err));
}

async function rmDir(pathToFolder) {
  await fs.promises.rmdir(pathToFolder, {recursive: true})
    .catch(err => console.log(err));
}


async function writeFile(pathToFile, dataForWrite) {
  await fs.promises.writeFile(pathToFile, dataForWrite)
    .catch(err => console.log(err));
} // Will create File if it not exists

async function appendFile(pathToFile, dataForAppend) {
  await fs.promises.appendFile(pathToFile, '\n' + dataForAppend)
    .catch(err => console.log(err));
} // Will create File if it not exists

async function readFile(pathToFile) {
  await fs.promises.readFile(pathToFile)
    .then(data => console.log(data.toString()))
    .catch(err => console.log(err));
}

async function clearFile(pathToFile) {
  await fs.promises.truncate(pathToFile)
    .catch(err => console.log(err));
}

async function moveFile(pathToFile, newPathToFile) {
  await fs.promises.rename(pathToFile, newPathToFile)
    .catch(err => console.log(err));
}

async function rmFile(pathToFile) {
  await fs.promises.unlink(pathToFile)
    .catch(err => console.log(err));
}


console.log(__dirname, '__dirname');
console.log(__filename, '__filename');

const pathToFolder = path.join(__dirname, 'Dir');
const pathToFolderAdv = path.join(pathToFolder, 'Trash');
const pathToFile = path.join(pathToFolder, 'file.txt');
const newPathToFile = path.join(pathToFolderAdv, 'badFile.txt');
const dataForWrite = 'First String';
const dataForAppend = 'Appended String';

const setTimeoutP = util.promisify(setTimeout);
// Make Promise from Function with call-back

const go = async () => {
  await setTimeoutP(1000).then(() => console.log('mkDir'));
  await mkDir(pathToFolderAdv);

  await setTimeoutP(1000).then(() => console.log('writeFile'));
  await writeFile(pathToFile, dataForWrite);

  await setTimeoutP(1000).then(() => console.log('readDir'));
  await readDir(pathToFolder);

  await setTimeoutP(1000).then(() => console.log('readDirAdv'));
  await readDirAdv(pathToFolder);

  await setTimeoutP(1000).then(() => console.log('appendFile'));
  await appendFile(pathToFile, dataForAppend);

  await setTimeoutP(1000).then(() => console.log('readFile'));
  await readFile(pathToFile);

  await setTimeoutP(1000).then(() => console.log('clearFile'));
  await clearFile(pathToFile);

  await setTimeoutP(1000).then(() => console.log('moveFile'));
  await moveFile(pathToFile, newPathToFile);

  await setTimeoutP(1000).then(() => console.log('rmFile'));
  await rmFile(newPathToFile);

  await setTimeoutP(1000).then(() => console.log('rmDir'));
  await rmDir(pathToFolder);
}

go().then();