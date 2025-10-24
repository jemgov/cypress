it("obtiene todos los elementos siguientes de un elemento de referencia dado,",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-next-all es la clase de 
    //oranges es el elemento de referencia
    cy.get('.traversal-next-all').contains('oranges').nextAll().should('have.length', 3)  //3 indica el nº de elementos restantes
})