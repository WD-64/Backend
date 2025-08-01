const errorHandler = (err, req, res, next) => {
  //In dev mode, log the error to the console
  process.env.NODE_ENV !== 'production' && console.log(err.stack);

  res.status(err.cause || 500).json({
    error: err.message || 'Internal server error',
  });
};

export default errorHandler;
