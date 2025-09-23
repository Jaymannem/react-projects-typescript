import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Enables TypeScript support
  testEnvironment: "jsdom", // Simulates browser environment for React
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Use ts-jest for TS files
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Load custom matchers
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],
  coverageReporters: ["text", "lcov"],

  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};

export default config;
