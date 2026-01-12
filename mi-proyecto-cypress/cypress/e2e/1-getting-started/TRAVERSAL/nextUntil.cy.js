it("obtiene los elementos siguientes de un elemento de referencia dado y hasta donde debe obtener,",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //veggies es el ID de referencia del elemento lista (li) 
    //nuts es el ID del elemento lista (li) donde debe finalizar la búsqueda
    cy.get('#veggies').nextUntil('#nuts').should('have.length', 3)      //3 es el nº de elementos que hay en veggies
})