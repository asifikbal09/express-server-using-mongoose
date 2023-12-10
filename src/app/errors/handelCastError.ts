import { Error } from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

const handelCastError = (err: Error.CastError): TGenericErrorResponse => {
  const errorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Validation Error from Cast Error.',
    errorSource,
  };
};

export default handelCastError;
