it("verifica que la url coincide con la de visit",()=>{
    cy.visit("https://example.cypress.io/commands/location")
    cy.url().should('eq', 'https://example.cypress.io/commands/location') //compara que la url sea la misma que la visitada
})