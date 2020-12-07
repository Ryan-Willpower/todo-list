export const response = {
  httpSuccess: {
    DEFAULT_MESSAGE: {
      SUCCESS: "Success",
    },
    success(message: string = "Success", args?: { [key: string]: any }) {
      return constructSuccessMessage(200, message, args)
    },
  },
  httpError: {
    DEFAULT_MESSAGE: {
      BAD_REQUEST: "Bad Request",
      NOT_AUTHORIZE: "Not Authorize",
      NOT_FOUND: "Not Found",
      NOT_ACCEPTABLE: "Not Acceptable",
      SERVICE_UNAVAILABLE: "Service Unavailable",
    },
    badRequest(message: string = "Bad Request", args?: { [key: string]: any }) {
      return constructErrorMessage(400, message, args)
    },
    notAuthorize(
      message: string = "Not Authorize",
      args?: { [key: string]: any }
    ) {
      return constructErrorMessage(401, message, args)
    },
    notFound(message: string = "Not Found", args?: { [key: string]: any }) {
      return constructErrorMessage(404, message, args)
    },
    notAcceptable(
      message: string = "Not Acceptable",
      args?: { [key: string]: any }
    ) {
      return constructErrorMessage(406, message, args)
    },
    serviceUnavailable(
      message: string = "Service Unavailable",
      args?: { [key: string]: any }
    ) {
      return constructErrorMessage(503, message, args)
    },
  },
}

function constructSuccessMessage(
  code: number,
  message: string,
  args?: { [key: string]: any }
) {
  return {
    statusCode: code,
    message,
    ...args,
  }
}

function constructErrorMessage(
  code: number,
  message: string,
  args?: { [key: string]: any }
) {
  return {
    statusCode: code,
    error: message,
    ...args,
  }
}
