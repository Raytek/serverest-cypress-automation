const userFactory = require('../support/factories/user.factory')
const productFactory = require('../support/factories/product.factory')
const userService = require('../support/services/user.service')
const authService = require('../support/services/auth.service')
const productService = require('../support/services/product.service')

describe('Product access control', () => {
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
  it('API-001 - should allow an administrator to create a product', () => {
    const adminUser = userFactory.createAdminUser()
    const product = productFactory.createProduct()
    userService.createUser(adminUser)
    authService.authenticateUser(adminUser)
      .then((response) => {
        expect(response.body).to.have.property('authorization')

        productService.createProduct(product, response.body.authorization)
          .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq(messages.api.productCreated)
            expect(response.body._id).to.be.a('string')
            expect(response.body._id).to.have.length.greaterThan(0)
          })
      })
  })
  it('API-002 - should reject product creation without authentication', () => {
    const product = productFactory.createProduct()
    productService.createProduct(product)
      .then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq(messages.api.missingAuthentication)
      })
  })
  it('API-003 - should reject product creation by a non-administrator user', () => {
    const consumerUser = userFactory.createConsumerUser()
    const product = productFactory.createProduct()
    userService.createUser(consumerUser)
    authService.authenticateUser(consumerUser)
      .then((response) => {
        expect(response.body).to.have.property('authorization')

        productService.createProduct(product, response.body.authorization)
          .then((response) => {
            expect(response.status).to.eq(403)
            expect(response.body.message).to.eq(messages.api.adminOnly)
          })
      })
  })
})
