it("verifica el hash de la url actual ",()=>{
    cy.visit("https://example.cypress.io/commands/location")
    cy.hash().should('be.empty')        //verifica que el hash está vacío
})