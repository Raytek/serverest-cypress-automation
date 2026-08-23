class ProductRegistration {
  fillProduct (product) {
    cy.get('[data-testid="nome"]').type(product.nome)
    cy.get('[data-testid="preco"]').type(product.preco)
    cy.get('[data-testid="descricao"]').type(product.descricao)
    cy.get('[data-testid="quantity"]').type(product.quantidade)
  }

  submit () { cy.get('[data-testid="cadastarProdutos"]').click() }
}

module.exports = new ProductRegistration()
