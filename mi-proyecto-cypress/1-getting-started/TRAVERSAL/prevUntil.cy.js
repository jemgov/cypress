it("obtiene todos los elementos hermanos anteriores dentro de los elementos hasta otro elemento",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.foods-list es la clase de la lista desordenada (ul)
    //#nuts es el ID del elemento de lista nuts
    //#veggies es el ID del elemento de lista vegetables
    //prevUntil devolverá los 3 elementos anteriores a la lista nuts
    cy.get('.foods-list').find('#nuts').prevUntil('#veggies').should('have.length', 3)  //3: cucumber, carrots y corn
})