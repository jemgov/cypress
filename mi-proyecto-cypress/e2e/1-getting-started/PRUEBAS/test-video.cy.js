describe('Ejemplo de grabación de video en Cypress', () => {
  it('Realiza una serie de acciones para grabar en video', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.get('.action-email').type('qa.tester@example.com').should('have.value', 'qa.tester@example.com')

    cy.get('.action-btn').click()

    // Tomamos una captura al final (esto también aparecerá en el video)
    cy.screenshot('final-del-video')
  })
})