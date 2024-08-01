const errorMessages = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};

export const HttpError = (status, message = errorMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  error.data = null;
  return error;
};
