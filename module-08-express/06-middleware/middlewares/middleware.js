//This is an example middleware
const middleware = (req, res, next) => {
  console.log('Middleware running...');

  req.chicken = 'Hello Iam a chicken';
  // Example
  // req.userEmail = 'anoj@gmail.com'

  next();
};

export default middleware;
