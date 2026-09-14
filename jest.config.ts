import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react' } }],
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  // .claude/worktrees holds full checkouts of other branches. Without it here,
  // jest collects their copies of these tests and runs each suite N+1 times.
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/.claude/'],
};

export default config;
