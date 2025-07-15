// const fs = require('fs/promises'); //CommonJS
import fs from 'fs/promises'; //ESM

const writeToFile = async () => {
  try {
    await fs.writeFile('example.txt', 'Hello from NodeJS');
    console.log('File has been successfully created!');
  } catch (error) {
    console.log(error);
  }
};

const readFromFile = async () => {
  const data = await fs.readFile('example.txt', 'utf8');
  console.log(data);
};

writeToFile();
readFromFile();
