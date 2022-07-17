module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(scss|css)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
