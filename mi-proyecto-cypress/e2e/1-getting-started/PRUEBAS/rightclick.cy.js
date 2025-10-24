describe("Función rightclick",() =>{
  it('.rightclick() - Clic derecho de ratón sobre elemento DOM', () => {
    cy.visit("https://example.cypress.io/commands/actions")
    // https://on.cypress.io/rightclick

    cy.get('.rightclick-action-div').rightclick()
    cy.get('.rightclick-action-div').should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')
  })
})