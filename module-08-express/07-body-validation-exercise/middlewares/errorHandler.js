const errorHandler = (err, req, res, next) => {
  res
    .status(err.cause || 500)
    .json({ error: err.message || 'Internal Server error' });
};

export default errorHandler;
