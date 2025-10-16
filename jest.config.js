export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
    transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
};