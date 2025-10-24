it("Ejecuta un comando de un sistema",() =>{
    cy.visit('https://example.cypress.io/commands/misc')
// execute a system command.
// so you can take actions necessary for
// your test outside the scope of Cypress.
cy.exec('echo Jane Lane')       //imprime "Jane Lane"
  .its('stdout').should('contain', 'Jane Lane') //verifica que la salida por pantalla contiene la cadena "Jane Lane"

// we can use Cypress.platform string to
// select appropriate command
cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`)

if (Cypress.platform === 'win32') {
  cy.exec('print cypress.config.js')
    .its('stderr').should('be.empty')
}
else {
  cy.exec('cat cypress.config.js')
    .its('stderr').should('be.empty')

  cy.exec('pwd')
    // for Cypress 14 and below, use 'code' instead of 'exitCode'
    .its('exitCode').should('eq', 0)
}
})