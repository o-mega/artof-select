module.exports = {
  cacheDirectory: ".jest-cache",
  collectCoverage: true,
  coverageReporters: ["lcov"],
  coverageDirectory: "test-coverage",
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testPathIgnorePatterns: ["<rootDir>/packages/(?:.+?)/lib/"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
};
