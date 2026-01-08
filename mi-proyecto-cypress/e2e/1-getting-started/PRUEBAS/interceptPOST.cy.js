describe('Intercept de red y validación de respuesta', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions')
  })

  it('Simula un POST y valida el intercept', () => {
    // Interceptamos cualquier POST a /comments y devolvemos 201
    cy.intercept('POST', '/comments', {
      statusCode: 201,
      body: { success: true }
    }).as('postComment')

    // Llenamos el formulario
    cy.get('.action-email').should('be.visible').type('qa@cypress.io')
    cy.get('.action-blur').should('be.visible').type('Comentario de prueba QA')

    // Enviar el formulario
    cy.get('.action-form').submit()

    // Simulamos un fetch para disparar el intercept
    cy.window().then(win => {
      return win.fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'qa@cypress.io', comment: 'Comentario de prueba QA' })
      })
    })

    // Validamos que el intercept se disparó y devolvió 201
    cy.wait('@postComment').its('response.statusCode').should('eq', 201)
  })
})