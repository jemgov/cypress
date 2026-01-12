it('Usa una variable de entorno de Cypress', () => {
  cy.visit(Cypress.env('url'))
})