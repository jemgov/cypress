it("obtiene el primer elemento dentro de una lista de elementos,",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //traversal-table es la clase de la tabla (td)
    cy.get('.traversal-table td').first().should('contain', '1')    //busca que en la tabla contenga el valor 1
})