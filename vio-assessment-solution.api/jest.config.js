module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  setupFiles: ['<rootDir>/jestSetup.ts'],
  rootDir: '.',
  roots: ['./src'],
  testRegex: 'src/.+(test)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        isolatedModules: true
      }
    ]
  },
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '.controller',
    'with-socketio',
    'local-strategy',
    'src/database',
    'src/socketio',
    'src/environment',
    'src/test'
  ],
  coverageReporters: ['text-summary', 'text', 'html'],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  },
  testEnvironment: 'node',
  testTimeout: 99999
};
