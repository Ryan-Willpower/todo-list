export const sign = jest.fn().mockReturnValue("aaaa.bbbb.cccc")
export const verify = jest.fn().mockReturnValue({
  author: "john",
  type: "access",
  iat: Date.now(),
  exp: Date.now(),
})
export const JsonWebTokenError = jest.requireActual("jsonwebtoken")
  .JsonWebTokenError
export const decode = jest.fn()
