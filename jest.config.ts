process.env.TZ = 'UTC';

export default {
  testMatch: ['**/?(*.)+(test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        sourcemap: true,
        loaders: {
          '.spec.ts': 'tsx',
        },
        target: 'ES2021',
      },
    ],
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  modulePathIgnorePatterns: ['<rootDir>/.build/'],
};
