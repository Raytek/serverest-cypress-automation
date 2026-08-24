const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true
  },
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
    }
  }
})
