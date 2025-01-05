const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3001/IMS-Admin',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    env: {
      apiUrl: 'http://localhost:5079/api'
    },
    chromeWebSecurity: false
  }
});