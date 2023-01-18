const fs = require('node:fs/promises');


async function readFile(pathToFile) {
  const data = await fs.readFile(pathToFile)
    .then(data => JSON.parse(data.toString()));
  // All errors will be caught in 'user.controller'
  return data;
}

async function writeFile(pathToFile, dataForWrite) {
  await fs.writeFile(pathToFile, JSON.stringify(dataForWrite, null, 2));
}


module.exports = {
  readFile,
  writeFile
}