it("obtiene el elemento hermano anterior dentro de elementos",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.fruits-list es la clase de la lista desordenada (ul)
    //.third es la clase del tercer elemento de la lista (bananas)
    //prevAll devolverá el nº de valores anteriores a bananas
    cy.get('.fruits-list').find('.third').prevAll().should('have.length', 2)    //2: apples y oranges
})