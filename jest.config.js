export default {
  transform: {},
  moduleNameMapper: {
    '^#calculators/(.*)$': '<rootDir>/src/calculators/$1',
    '^#tests/(.*)$': '<rootDir>/src/tests/$1',
    '^#utils/(.*)$': '<rootDir>/src/utils/$1',
    '^#utils$': '<rootDir>/src/utils/index.js',
    '^#config$': '<rootDir>/src/config.js'
  },
  testEnvironment: 'node'
};
