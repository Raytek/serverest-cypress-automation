const userFactory = require('../support/factories/user.factory')
const authService = require('../support/services/auth.service')
const productService = require('../support/services/product.service')
const userService = require('../support/services/user.service')

Cypress.Commands.addAll({
  cleanupTestData () {
    const cleanupAdmin = userFactory.createAdminUser()
    userService.createUser(cleanupAdmin)
    authService.authenticateUser(cleanupAdmin)
      .then((response) => {
        expect(response.body).to.have.property('authorization')

        const auth = response.body.authorization

        productService.getProducts()
          .then((productsResponse) => {
            const testProducts = productsResponse.body.produtos.filter(
              (product) => product.nome.startsWith('SRCA_QA_Product_')
            )

            testProducts.forEach((product) => {
              productService.deleteProduct(product._id, auth)
                .then((deleteProductResponse) => {
                  expect(deleteProductResponse.status).to.eq(200)
                })
            })
          })

        userService.getUsers()
          .then((usersResponse) => {
            const testUsers = usersResponse.body.usuarios.filter(
              (user) => user.email.startsWith('srca.qa.')
            )

            testUsers.forEach((user) => {
              userService.deleteUser(user._id)
                .then((deleteUserResponse) => {
                  expect(deleteUserResponse.status).to.eq(200)
                })
            })
          })
      })
  },
  loginAsAdmin () {
    const adminUser = userFactory.createAdminUser()
    userService.createUser(adminUser)
    authService.authenticateUser(adminUser)
      .then((response) => {
        cy.visit('/admin/home', {
          onBeforeLoad (win) {
            win.localStorage.setItem('serverest/userToken', response.body.authorization)
            win.localStorage.setItem('serverest/userNome', adminUser.nome)
            win.localStorage.setItem('serverest/userEmail', adminUser.email)
          }
        })
      })
  }
})
