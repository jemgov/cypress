describe('Simular error 401', () => {
  it('Intercepta GET y devuelve 401', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.intercept('GET', '/api/profile', {
      statusCode: 401,
      body: { error: 'No autorizado' }
    }).as('unauthorized')

    cy.window().then(win => {
      return win.fetch('/api/profile')
    })

    cy.wait('@unauthorized')
      .its('response.statusCode')
      .should('eq', 401)
  })
})