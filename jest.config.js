const pathIgnorePatterns = [
  '<rootDir>/.git/',
  '<rootDir>/.next/',
  '<rootDir>/node_modules/',
];

module.exports = {
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  testPathIgnorePatterns: pathIgnorePatterns,
  watchPathIgnorePatterns: pathIgnorePatterns,
};
