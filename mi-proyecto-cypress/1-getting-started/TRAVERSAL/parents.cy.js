it("obtiene todos los elementos padres del elemento",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-cite es la clase del elemento cite
    cy.get('.traversal-cite').parents().should('match', 'blockquote')   //machea "blockquote" que es uno de los elementos padre
})