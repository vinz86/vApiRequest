module.exports = {
    // Indica a Jest di eseguire il file setupTests.ts prima dei test
    setupFilesAfterEnv: ['<rootDir>/src/tests/SetupTest.ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
};