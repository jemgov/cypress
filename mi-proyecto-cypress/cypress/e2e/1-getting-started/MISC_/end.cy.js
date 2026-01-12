it("",() =>{
    cy.visit('https://example.cypress.io/commands/misc')
// cy.end is useful when you want to end a chain of commands
// and force Cypress to re-query from the root element
cy.get('.misc-table').within(() => {
  // ends the current chain and yields null
  cy.contains('Cheryl').click().end()       //finaliza la cadena actual

  // queries the entire table again
  cy.contains('Charles').click()            //realiza una nueva consulta al root del DOM
    })
})