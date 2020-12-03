import { generateAccessToken } from "../../helpers/generate-access-token"

describe("helper/generateAccessToken", () => {
  it("should generate an access token", () => {
    const accessToken = generateAccessToken("john")

    expect(accessToken).toBe("aaaa.bbbb.cccc")
  })
})
