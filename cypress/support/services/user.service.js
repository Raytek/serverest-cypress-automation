const usersUrl = `${Cypress.expose('apiUrl')}/usuarios`

function createUser (user) {
  return cy.request({
    url: usersUrl,
    method: 'POST',
    body: user
  })
}

function getUsers () {
  return cy.request({
    url: usersUrl,
    method: 'GET'
  })
}

function deleteUser (userId) {
  return cy.request({
    url: `${usersUrl}/${userId}`,
    method: 'DELETE'
  })
}

module.exports = { createUser, getUsers, deleteUser }
