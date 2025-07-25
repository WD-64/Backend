import * as z from 'zod';

//This is just a test file to show how Zod works. Not integrated to the backend yet.

//Incoming from browser
const userData = {
  username: 'Anoj',
  password: '21',
};

const signInData = z.object({
  username: z.string(),
  password: z.string().min(8),
});

const result = signInData.parse(userData);
console.log(result);
