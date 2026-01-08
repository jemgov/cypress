describe('Simular error 404', () => {
  it('Intercepta GET y devuelve 404', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.intercept('GET', '/api/users/1', {
      statusCode: 404,
      body: { error: 'Usuario no encontrado' }
    }).as('user404')

    cy.window().then(win => {
      return win.fetch('/api/users/1')
    })

    cy.wait('@user404')
      .its('response.statusCode')
      .should('eq', 404)
  })
})