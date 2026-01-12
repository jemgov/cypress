it("obtiene el último elemento dentro de una lista de elementos,",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //traversal-buttons es la clase del contenedor de botones
    cy.get('.traversal-buttons .btn').last().should('contain', 'Submit')    //busca que el botón contenga la palabra Submit
})