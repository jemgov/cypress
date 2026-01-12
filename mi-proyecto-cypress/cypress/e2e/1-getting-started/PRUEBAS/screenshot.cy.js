describe('Ejemplo de uso de cy.screenshot()', () => {
  it('Toma una captura de toda la página', () => {
    cy.visit('https://example.cypress.io/')

    // Espera a que la página cargue completamente
    cy.get('h1').should('be.visible')

    // Captura de toda la pantalla
    cy.screenshot('pagina-principal')

    // Captura de un elemento específico
    cy.get('.banner').screenshot('solo-banner')
  })
})