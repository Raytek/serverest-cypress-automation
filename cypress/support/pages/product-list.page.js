class ProductList {
  getProductRow (productName) {
    return cy.contains('td', productName).closest('tr')
  }

  getProductsByName (productName) {
    return cy.get('tbody td')
      .filter((_, cell) => cell.innerText.trim() === productName)
  }
}

module.exports = new ProductList()
