const loginUrl = `${Cypress.expose('apiUrl')}/login`

function authenticateUser (user) {
  return cy.request({
    url: loginUrl,
    method: 'POST',
    body: {
      email: user.email,
      password: user.password
    }
  })
}

module.exports = { authenticateUser }
