describe('Simular error 422', () => {
  it('Intercepta POST y devuelve 422', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.intercept('POST', '/api/register', {
      statusCode: 422,
      body: { error: 'Email inválido' }
    }).as('invalidEmail')

    cy.window().then(win => {
      return win.fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'no-es-email' })
      })
    })

    cy.wait('@invalidEmail')
      .its('response.statusCode')
      .should('eq', 422)
  })
})