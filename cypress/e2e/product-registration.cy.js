const navbar = require('../support/components/navbar.component')
const productRegistration = require('../support/pages/product-registration.page')
const productList = require('../support/pages/product-list.page')
const productFactory = require('../support/factories/product.factory')
const productService = require('../support/services/product.service')

describe('Product registration', () => {
  let messages
  before(() => {
    cy.fixture('messages').then((data) => {
      messages = data
    })
    cy.cleanupTestData()
  })
  after(() => {
    cy.cleanupTestData()
  })
  beforeEach(() => {
    cy.loginAsAdmin().as('adminAuth')
  })
  it('E2E-001 - should successfully register a new product', () => {
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
  it('E2E-002 - should reject duplicate product registration', () => {
    const product = productFactory.createProduct()
    cy.get('@adminAuth').then((adminAuth) => {
      productService.createProduct(product, adminAuth)
        .then((response) => {
          expect(response.status).to.eq(201)
        })
    })
    navbar.goToRegisterProducts()
    productRegistration.fillProduct(product)
    productRegistration.submit()
    cy.contains(messages.productRegistration.duplicateProduct)
      .should('be.visible')
    navbar.goToListProducts()
    productList.getProductsByName(product.nome).should('have.length', 1)
  })
  it('E2E-003 - should validate required fields when registering a product', () => {
    navbar.goToRegisterProducts()
    productRegistration.submit()
    cy.contains(messages.productRegistration.requiredName)
      .should('be.visible')
    cy.contains(messages.productRegistration.requiredPrice)
      .should('be.visible')
    cy.contains(messages.productRegistration.requiredDescription)
      .should('be.visible')
    cy.contains(messages.productRegistration.requiredQuantity)
      .should('be.visible')
  })
})
