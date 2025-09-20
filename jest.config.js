module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: [
    "<rootDir>/apps/api/test/**/*.test.ts"
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};