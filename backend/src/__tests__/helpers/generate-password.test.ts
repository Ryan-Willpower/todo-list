import { generatePassword } from "../../helpers/generate-password"

describe("helper/generatePassword", () => {
  it("should has type `string`", () => {
    const string = generatePassword()

    expect(typeof string).toBe("string")
  })

  it("should has length `6`", () => {
    expect(generatePassword()).toHaveLength(6)
  })
})
