class ProductList {
  getProductRow (productName) {
    return cy.contains('td', productName).closest('tr')
  }
}

module.exports = new ProductList()
