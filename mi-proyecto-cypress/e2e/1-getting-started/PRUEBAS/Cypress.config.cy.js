it('Verifica y cambia configuración temporalmente', () => {
  cy.log('Timeout actual:', Cypress.config('defaultCommandTimeout'))

  // Permite leer o modificar la configuración de Cypress en tiempo de ejecución.
  // Cambiar el timeout solo para este test
  Cypress.config('defaultCommandTimeout', 10000)

  cy.visit('https://example.cypress.io')
})