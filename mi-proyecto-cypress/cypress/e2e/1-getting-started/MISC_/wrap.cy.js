it("Envuelve un objeto",() =>{
    cy.visit('https://example.cypress.io/commands/misc')
    cy.wrap({foo: 'bar'}).should('have.property', 'foo').and('include', 'bar')
})