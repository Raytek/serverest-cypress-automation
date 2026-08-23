function authenticateUser (user) {
  return cy.request({
    url: `${Cypress.expose('apiUrl')}/login`,
    method: 'POST',
    body: {
      email: user.email,
      password: user.password
    }
  })
}

module.exports = { authenticateUser }
