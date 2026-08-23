const navbar = require('../support/components/navbar.component')
const productRegistration = require('../support/pages/product-registration.page')
const productList = require('../support/pages/product-list.page')
const productFactory = require('../support/factories/product.factory')

describe('Product registration', () => {
  before(() => {
    cy.cleanupTestData()
  })
  after(() => {
    cy.cleanupTestData()
  })
  beforeEach(() => {
    cy.loginAsAdmin()
  })
  it('should successfully register a new product', () => {
    const product = productFactory.createProduct()
    navbar.goToRegisterProducts()
    productRegistration.fillProduct(product)
    productRegistration.submit()
    productList.getProductRow(product.nome).within(() => {
      cy.contains('td', product.nome).should('be.visible')
      cy.contains('td', product.preco).should('be.visible')
      cy.contains('td', product.descricao).should('be.visible')
      cy.contains('td', product.quantidade).should('be.visible')
    })
  })
})
