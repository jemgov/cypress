describe('Simular error 403', () => {
  it('Intercepta GET y devuelve 403', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.intercept('GET', '/api/admin', {
      statusCode: 403,
      body: { error: 'Acceso denegado' }
    }).as('forbidden')

    cy.window().then(win => {
      return win.fetch('/api/admin')
    })

    cy.wait('@forbidden')
      .its('response.statusCode')
      .should('eq', 403)
  })
})