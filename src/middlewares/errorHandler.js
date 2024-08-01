export const errorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Server error!', data = null } = err;
  res.status(status).json({
    status,
    message,
    data,
  });
};
