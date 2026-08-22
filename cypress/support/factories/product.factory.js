const { v4: uuidv4 } = require('uuid')

function createProduct (overrides = {}) {
  return {
    nome: `QA Product ${uuidv4()}`,
    preco: 10,
    descricao: 'Automated test product',
    quantidade: 88,
    ...overrides
  }
}

module.exports = { createProduct }
