import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";

const handleZodError = (err: ZodError) => {
  const statusCode = httpStatus.BAD_REQUEST;
  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: 'Zod Validation Error.',
    errorSource,
  };
};

export default handleZodError;
