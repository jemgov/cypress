  it('"Enfocar elemento"', () => {
    cy.visit("https://example.cypress.io/commands/actions")
    // https://on.cypress.io/focus
    cy.get('.action-focus').focus()
    cy.get('.action-focus').should('have.class', 'focus').prev().should('have.attr', 'style', 'color: orange;')
  })