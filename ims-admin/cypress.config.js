const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://sultan-303.github.io/IMS-Admin',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    env: {
      apiUrl: 'http://localhost:5079/api'
    },
    chromeWebSecurity: false
  }
});