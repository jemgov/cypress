describe("Función blur: desenfocar elemento",() =>{
  it('.blur() - blur off a DOM element', () => {
    cy.visit("https://example.cypress.io/commands/actions")
    // https://on.cypress.io/blur
    cy.get('.action-blur').type('About to blur')
    cy.get('.action-blur').blur()
    cy.get('.action-blur').should('have.class', 'error').prev().should('have.attr', 'style', 'color: red;')
  })
})