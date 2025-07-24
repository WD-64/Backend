//This is another more realistic example
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== 'admin') {
    return res.status(401).json({ message: 'Not authorized!' });
  }

  next();
};

export default verifyAdmin;
