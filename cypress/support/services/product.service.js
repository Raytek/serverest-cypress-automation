function createProduct (product, auth = null) {
  return cy.request({
    url: `${Cypress.expose('apiUrl')}/produtos`,
    method: 'POST',
    headers: auth ? { Authorization: auth } : {},
    body: product,
    failOnStatusCode: false
  })
}

module.exports = { createProduct }
