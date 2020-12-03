import { generateRefreshToken } from "../../helpers/generate-refresh-token"

describe("helper/generateAccessToken", () => {
  it("should generate an access token", async () => {
    const refreshToken = await generateRefreshToken("john")

    expect(refreshToken).toBe("aaaa.bbbb.cccc")
  })
})
