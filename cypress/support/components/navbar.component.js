class Navbar {
  goToHome () { cy.get('[data-testid="home"]').click() }
  goToRegisterUsers () { cy.get('[data-testid="cadastrar-usuarios"]').click() }
  goToListUsers () { cy.get('[data-testid="listar-usuarios"]').click() }
  goToRegisterProducts () { cy.get('[data-testid="cadastrar-produtos"]').click() }
  goToListProducts () { cy.get('[data-testid="listar-produtos"]').click() }
  logout () { cy.get('[data-testid="logout"]').click() }
}

module.exports = new Navbar()
