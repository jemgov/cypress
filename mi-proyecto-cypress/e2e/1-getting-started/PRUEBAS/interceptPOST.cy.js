describe('Intercept de red y validación de respuesta', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions')
  })

  it('Simula un POST y valida el intercept', () => {
    cy.intercept('POST', '/comments', {
      statusCode: 201,
      body: { success: true }
    }).as('postComment')

    cy.get('.action-email').type('qa@cypress.io')
    cy.get('.action-blur').type('Comentario de prueba QA')

    // Disparamos manualmente la petición POST
    cy.window().then(win => {
      return win.fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'qa@cypress.io',
          comment: 'Comentario de prueba QA'
        })
      })
    })

    cy.wait('@postComment')
      .its('response.statusCode')
      .should('eq', 201)
  })
})