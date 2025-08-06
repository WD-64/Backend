import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  //The cookies property will be added by the Cookie Parser package.
  //Make sure its set up on index.js
  const { token } = req.cookies;

  //First, we check if there is even a cookie called token
  if (!token) throw new Error('Unauthorized', { cause: 401 });

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  req.body.author = payload.id;

  next();
};

export default verifyToken;
