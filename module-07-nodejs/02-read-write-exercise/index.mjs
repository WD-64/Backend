// const fs = require('fs') //Common JS
import fs from 'fs/promises'; //Ecma Script Modules (ESM)
import path from 'path';

//This function checks if a folder exists and creates one if it doesn't exist
const createDirIfNotExists = async (dirPath) => {
  try {
    await fs.access(dirPath);
    console.log('Folder exists');
  } catch (error) {
    await fs.mkdir(dirPath, { recursive: true });
    console.log('Folder created successfully');
  }
};

const createFileWithMessage = async (message) => {
  try {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    const dirName = `${year}-${month}-${date}`; //For naming the folder
    const fileName = `${hour}-${minutes}-${seconds}.txt`; //For naming the file. Don't forget extension.
    const filePath = path.join(dirName, fileName); //For joining folder name and file name into one path.

    await createDirIfNotExists(dirName);

    //Create a file and place inside above folder
    //Put content inside file
    fs.appendFile(filePath, message);
  } catch (error) {
    console.log(error);
  }
};

const deleteFileByName = async (filePath) => {
  try {
    await fs.access(filePath); //Check if file exists
    await fs.unlink(filePath); //Delete the file if it exsists
    console.log('File deleted!');
  } catch (error) {
    console.log('File not found!');
  }
};

//Terminal execution
const command = process.argv[2];
const argument = process.argv[3];

if (command === 'create') {
  createFileWithMessage(argument);
} else if (command === 'delete') {
  deleteFileByName(argument);
} else {
  console.log('Invalid command or argument!');
}

/*
Example usage:
Run following in the terminal

node index.mjs create 'Hello world!'
*/
