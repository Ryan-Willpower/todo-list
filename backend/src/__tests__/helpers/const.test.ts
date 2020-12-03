import { response } from "../../helpers/const"

describe("helper/const", () => {
  describe("response/httpSuccess", () => {
    describe("success", () => {
      it("should return with default success object", () => {
        expect(response.httpSuccess.success()).toStrictEqual({
          statusCode: 200,
          message: "Success",
        })
      })

      it("should return with custom success message", () => {
        const customMessage = "Client Success"

        expect(response.httpSuccess.success(customMessage)).toStrictEqual({
          statusCode: 200,
          message: customMessage,
        })
      })

      it("should return with default success object with extra field", () => {
        expect(
          response.httpSuccess.success(
            response.httpSuccess.DEFAULT_MESSAGE.SUCCESS,
            { detail: "test" }
          )
        ).toStrictEqual({
          statusCode: 200,
          message: "Success",
          detail: "test",
        })
      })
    })
  })

  describe("response/httpError", () => {
    describe("bad request", () => {
      it("should return with default bad request object", () => {
        expect(response.httpError.badRequest()).toStrictEqual({
          statusCode: 400,
          error: "Bad Request",
        })
      })

      it("should return with custom bad request message", () => {
        const customMessage = "Client Bad Request"

        expect(response.httpError.badRequest(customMessage)).toStrictEqual({
          statusCode: 400,
          error: customMessage,
        })
      })

      it("should return with default bad request object with extra field", () => {
        expect(
          response.httpError.badRequest(
            response.httpError.DEFAULT_MESSAGE.BAD_REQUEST,
            { detail: "test" }
          )
        ).toStrictEqual({
          statusCode: 400,
          error: "Bad Request",
          detail: "test",
        })
      })
    })

    describe("not found", () => {
      it("should return with default not found object", () => {
        expect(response.httpError.notFound()).toStrictEqual({
          statusCode: 404,
          error: "Not Found",
        })
      })

      it("should return with custom not found message", () => {
        const customMessage = "Client Not Found"

        expect(response.httpError.notFound(customMessage)).toStrictEqual({
          statusCode: 404,
          error: customMessage,
        })
      })

      it("should return with default not found object with extra field", () => {
        expect(
          response.httpError.notFound(
            response.httpError.DEFAULT_MESSAGE.NOT_FOUND,
            { detail: "test" }
          )
        ).toStrictEqual({
          statusCode: 404,
          error: "Not Found",
          detail: "test",
        })
      })
    })

    describe("not acceptable", () => {
      it("should return with default not acceptable object", () => {
        expect(response.httpError.notAcceptable()).toStrictEqual({
          statusCode: 406,
          error: "Not Acceptable",
        })
      })

      it("should return with custom not acceptable message", () => {
        const customMessage = "Client Not Acceptable"

        expect(response.httpError.notAcceptable(customMessage)).toStrictEqual({
          statusCode: 406,
          error: customMessage,
        })
      })

      it("should return with default not acceptable object with extra field", () => {
        expect(
          response.httpError.notAcceptable(
            response.httpError.DEFAULT_MESSAGE.NOT_ACCEPTABLE,
            { detail: "test" }
          )
        ).toStrictEqual({
          statusCode: 406,
          error: "Not Acceptable",
          detail: "test",
        })
      })
    })

    describe("service unavailable", () => {
      it("should return with default service unavailable object", () => {
        expect(response.httpError.serviceUnavailable()).toStrictEqual({
          statusCode: 503,
          error: "Service Unavailable",
        })
      })

      it("should return with custom service unavailable message", () => {
        const customMessage = "Client Service Unavailable"

        expect(
          response.httpError.serviceUnavailable(customMessage)
        ).toStrictEqual({
          statusCode: 503,
          error: customMessage,
        })
      })

      it("should return with default service unavailable object with extra field", () => {
        expect(
          response.httpError.serviceUnavailable(
            response.httpError.DEFAULT_MESSAGE.SERVICE_UNAVAILABLE,
            { detail: "test" }
          )
        ).toStrictEqual({
          statusCode: 503,
          error: "Service Unavailable",
          detail: "test",
        })
      })
    })
  })
})
