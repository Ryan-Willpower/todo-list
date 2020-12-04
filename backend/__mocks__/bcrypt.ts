export default {
  compare: jest.fn().mockImplementation(async (a, b) => a === b),
  genSalt: jest.fn().mockResolvedValue("saltround10"),
  hash: jest.fn().mockResolvedValue("somehashvalue"),
}
