module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/apps/dashboard/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  testMatch: ['<rootDir>/apps/dashboard/src/**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|mjs|html|js)$': 'ts-jest',
  },
};
