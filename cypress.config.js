const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,
  expose: {
    apiUrl: 'https://serverest.dev'
  },
  e2e: {
    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/api/**/*.cy.js'
    ],
    baseUrl: 'https://front.serverest.dev',
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  }
})
