const productsUrl = `${Cypress.expose('apiUrl')}/produtos`

function createProduct (product, auth = null) {
  return cy.request({
    url: productsUrl,
    method: 'POST',
    headers: auth ? { Authorization: auth } : {},
    body: product,
    failOnStatusCode: false
  })
}

function getProducts () {
  return cy.request({
    url: productsUrl,
    method: 'GET'
  })
}

function deleteProduct (productId, auth = null) {
  return cy.request({
    url: `${productsUrl}/${productId}`,
    method: 'DELETE',
    headers: auth ? { Authorization: auth } : {},
    failOnStatusCode: false
  })
}

module.exports = { createProduct, getProducts, deleteProduct }
