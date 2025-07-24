const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(404).json({ message: err.message });
};

export default errorHandler;
