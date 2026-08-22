const { createAdminUser } = require('../support/factories/user.factory')
const { createProduct } = require('../support/factories/product.factory')

describe('Product access control', () => {
  it('should allow an administrator to create a product', () => {
    const adminUser = createAdminUser()
    const product = createProduct()
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        url: `${apiUrl}/usuarios`,
        method: 'POST',
        body: adminUser
      })
      cy.request({
        url: `${apiUrl}/login`,
        method: 'POST',
        body: {
          email: adminUser.email,
          password: adminUser.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('authorization')
        cy.request({
          url: `${apiUrl}/produtos`,
          method: 'POST',
          headers: { Authorization: response.body.authorization },
          body: product
        }).then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
          expect(response.body).to.have.property('_id')
        })
      })
    })
  })
  it('should reject product creation without authentication', () => {
    const product = createProduct()
    cy.env(['apiUrl']).then(({ apiUrl }) => {
      cy.request({
        url: `${apiUrl}/produtos`,
        method: 'POST',
        failOnStatusCode: false,
        body: product
      }).then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })
  })
})
