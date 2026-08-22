const { v4: uuidv4 } = require('uuid')

function createUser (overrides = {}) {
  return {
    nome: 'ServeRest QA User',
    email: 'qa.user@serverest.dev',
    password: 'Test@321',
    administrador: 'false',
    ...overrides
  }
}

function createAdminUser () {
  return createUser({
    nome: 'ServeRest QA Admin',
    email: `qa.admin.${uuidv4()}@serverest.dev`,
    administrador: 'true'
  })
}

function createConsumerUser () {
  return createUser({
    nome: 'ServeRest QA Consumer',
    email: `qa.consumer.${uuidv4()}@serverest.dev`
  })
}

module.exports = { createAdminUser, createConsumerUser }
