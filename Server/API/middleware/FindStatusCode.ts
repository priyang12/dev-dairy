export const StatusCode = (
  error: Error
): {
  statusCode: number;
  message: string;
} => {
  const DBregex = /^DB Error: /;
  const CRUDregex = /^CRUD Error: /;
  const NotFoundRegex = /Not Found/;
  const InvalidInputRegex = /^Invalid Input: /;

  if (DBregex.test(error.message)) {
    console.log("DB Error: ", error.message);
    return {
      statusCode: 500,
      message: error.message.replace(DBregex, ""),
    };
  }
  if (CRUDregex.test(error.message)) {
    console.log("CRUD Error: ", error.message);
    return {
      statusCode: 409,
      message: error.message.replace(CRUDregex, ""),
    };
  }
  if (NotFoundRegex.test(error.message)) {
    console.log("Not Found: ", error.message);
    return {
      statusCode: 404,
      message: error.message,
    };
  }
  if (InvalidInputRegex.test(error.message)) {
    console.log("Invalid Input: ", error.message);
    return {
      statusCode: 400,
      message: error.message.replace(InvalidInputRegex, ""),
    };
  }

  switch (error.message) {
    case "Invalid Password":
      return {
        statusCode: 403,
        message: error.message,
      };
    default:
      return {
        statusCode: 500,
        message: error.message,
      };
  }
};
