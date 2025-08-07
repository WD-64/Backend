import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  //The cookies property will be added by the Cookie Parser package.
  //Make sure its set up on index.js
  const { token } = req.cookies;

  //First, we check if there is even a cookie called token
  if (!token) throw new Error('Unauthorized', { cause: 401 });

  //We then verify the token
  //If successful, jwt returns the payload
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  // We can then add the id from the payload to the req body.
  // req.body.author = payload.id;
  req.userId = payload.id;

  //Pass control to next middleware or request handler(controller function)
  next();
};

export default verifyToken;
