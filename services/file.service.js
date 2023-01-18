const fs = require('node:fs/promises');

/**
 * Read_File
 * @param pathToFile {String} Path to file for reading
 * @returns {Promise} Processed data from file
 */
async function readFile(pathToFile) {
  const data = await fs.readFile(pathToFile);
  return JSON.parse(data.toString());
}

/**
 * Write_File
 * @param pathToFile {String} Path to file for writing
 * @param dataForWrite Any data for writing in the file
 * @returns {Promise<void>}
 */
async function writeFile(pathToFile, dataForWrite) {
  await fs.writeFile(pathToFile, JSON.stringify(dataForWrite, null, 2));
}


module.exports = {
  readFile,
  writeFile
}