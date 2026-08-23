const userFactory = require('../support/factories/user.factory')
const productFactory = require('../support/factories/product.factory')
const userService = require('../support/services/user.service')
const authService = require('../support/services/auth.service')
const productService = require('../support/services/product.service')

describe('Product access control', () => {
  it('should allow an administrator to create a product', () => {
    const adminUser = userFactory.createAdminUser()
    const product = productFactory.createProduct()
    userService.createUser(adminUser)
    authService.authenticateUser(adminUser)
      .then((response) => {
        expect(response.body).to.have.property('authorization')

        productService.createProduct(product, response.body.authorization)
          .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            expect(response.body._id).to.be.a('string')
            expect(response.body._id).to.have.length.greaterThan(0)
          })
      })
  })
  it('should reject product creation without authentication', () => {
    const product = productFactory.createProduct()
    productService.createProduct(product)
      .then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })
  it('should reject product creation by a non-administrator user', () => {
    const consumerUser = userFactory.createConsumerUser()
    const product = productFactory.createProduct()
    userService.createUser(consumerUser)
    authService.authenticateUser(consumerUser)
      .then((response) => {
        expect(response.body).to.have.property('authorization')

        productService.createProduct(product, response.body.authorization)
          .then((response) => {
            expect(response.status).to.eq(403)
            expect(response.body.message).to.eq('Rota exclusiva para administradores')
          })
      })
  })
})
