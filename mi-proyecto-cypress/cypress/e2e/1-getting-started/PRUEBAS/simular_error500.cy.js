describe('Simular error 500 con intercept', () => {
  it('Intercepta y valida error 500', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.intercept('POST', '/api/login', {
      statusCode: 500,
      body: { error: "Error interno del servidor" }
    }).as('login500')

    cy.window().then(win => {
      return win.fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: 'qa', pass: '1234' })
      })
    })

    cy.wait('@login500')
      .its('response.statusCode')
      .should('eq', 500)
  })
})