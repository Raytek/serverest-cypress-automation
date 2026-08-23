function createUser (user) {
  return cy.request({
    url: `${Cypress.expose('apiUrl')}/usuarios`,
    method: 'POST',
    body: user
  })
}

module.exports = { createUser }
