it("obtiene el elemento padre del elemento",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-mark es la clase del elemento mark
    cy.get('.traversal-mark').parent().should('contain', 'Morbi leo risus')
})