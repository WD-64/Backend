//This is a temporary file to generate a random string for the JWT secret key.
// Delete it after it generates a key!!!

import crypto from 'crypto';

const secret = crypto.randomBytes(32).toString('hex');

console.log(secret);

// Instead of creating a file, you can also run the above JS code directly in the terminal like below
//node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
