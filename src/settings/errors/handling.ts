import { response } from "express";
import { DatabaseError } from "pg-protocol";
import { QueryFailedError, TypeORMError } from "typeorm";

interface IErrorMessage {
  type: string;
  code?: string | undefined;
  message: string;
  name: string;
  parameters?: string | any[] | undefined;
  query?: string | undefined;
  stack?: string;
}

const TYPES = Object.freeze({
  QueryFailedError: "QueryFailedError",
  TypeORMError: "TypeORMError",
  DatabaseError: "DatabaseError",
  Error: "Error",
  Undefined: "Undefined",
  CloudinaryError: "CloudinaryError",
});

const CONTACT_ADMINISTRATOR = "Contact the Administrator:";
const UNKNOWN_ERROR = "Unknown Error:";
const FAIL_PROCESS = (functionName: string) => `${functionName}`;

const setMessage = (error: unknown): IErrorMessage => {
  try {
    if (error instanceof QueryFailedError) {
      return {
        type: TYPES.QueryFailedError,
        code: undefined,
        message: error.message,
        name: error.name,
        parameters: error.parameters,
        query: error.query,
        stack: error.stack,
      };
    }

    if (error instanceof TypeORMError) {
      return {
        type: TYPES.TypeORMError,
        code: undefined,
        message: error.message,
        name: error.name,
        parameters: undefined,
        query: undefined,
        stack: error.stack,
      };
    }

    if (error instanceof DatabaseError) {
      return {
        type: TYPES.DatabaseError,
        code: error.code,
        message: error.message,
        name: error.name,
        parameters: undefined,
        query: undefined,
        stack: error.stack,
      };
    }

    const err = error as Error;
    const customError = {
      type: TYPES.Error,
      code: undefined,
      message: err.message,
      name: err.name,
      parameters: undefined,
      query: undefined,
      stack: undefined,
    };

    return customError;
  } catch (error) {
    console.log("Handling.message: Undefined Error - ", error);
    return {
      type: TYPES.Undefined,
      code: undefined,
      message: `${UNKNOWN_ERROR}. ${CONTACT_ADMINISTRATOR}`,
      name: UNKNOWN_ERROR,
      parameters: undefined,
      query: undefined,
      stack: undefined,
    };
  }
};

export const getMessage = (error: any, origin: string) => {
  console.log(error);
  const errorMessage = setMessage(error);
  let customMessage =
    errorMessage.type !== "Error" && errorMessage.name !== "Error"
      ? `Origin: ${FAIL_PROCESS(origin)}|Type: ${errorMessage.type}|Name: ${
          errorMessage.name
        }|Message: ${errorMessage.message}`
      : `Origin: ${FAIL_PROCESS(origin)}|Message: ${errorMessage.message}`;

  if (errorMessage.code)
    customMessage = customMessage + `|Code: ${errorMessage.code}`;

  return {
    type: errorMessage.type,
    message: customMessage,
  };
};

export const throwError = (error: any, res = response, origin: string) => {
  const { type, message } = getMessage(error, origin);

  if (type === TYPES.Undefined)
    return res.status(500).json({
      OK: false,
      MESSAGE: message,
    });
  else
    return res.status(400).json({
      OK: false,
      MESSAGES: {
        ...message.split("|"),
      },
    });
};

// VALIDATIONS
export const FIND_DATA = Object.freeze({
  ALREADY_EXISTS: (entity: string, field: string, value: string) =>
    `${entity} with ${field}: ${value} already exists. `,
  DONT_EXISTS: (entity: string, field: string, value: string) =>
    `${entity} with ${field}: ${value} dont exists. `,
});

export const INVALID_TERM = (entity: string, param: string, value: string) =>
  `${entity} Field ${param}:"${value}" not found in ${entity}`;

export const INVALID_ID = (entity: string, param: string, value: number) =>
  `${entity} Field ${param}:"${value}" not found in ${entity}`;
