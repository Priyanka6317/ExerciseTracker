const errorHandler = (err, req, res, next) => {
  res
    .status(res.statusCode)
    .json({ message: err.message, stackTrace: err.stack });
};

module.exports = { errorHandler };
