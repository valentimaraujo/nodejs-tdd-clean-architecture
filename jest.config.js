module.exports = {
  coverageProvider: 'babel',
  watchPathIgnorePatterns: ['globalConfig'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],
  preset: '@shelf/jest-mongodb'
}
