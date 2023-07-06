import { defineConfig } from 'cypress';

export default defineConfig({
  fixturesFolder: 'src/main/test/cypress/fixtures',
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: 'src/main/test/cypress/support/e2e.ts',
    specPattern: 'src/main/test/cypress/e2e/**/*.cy.{ts,tsx}',
    video: false,
  },
  video: false,
});
