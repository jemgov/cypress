it("obtiene los elementos siguientes de un elemento de referencia dado y hasta donde debe obtener,",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //veggies es el ID de referencia del elemento lista (li) 
    //nuts es el ID del elemento lista (li) donde debe finalizar la búsqueda
    //muestra los elementos de Vegetables excepto carrots
    cy.get('#veggies').nextUntil('#nuts').not(':contains("carrots")')
})