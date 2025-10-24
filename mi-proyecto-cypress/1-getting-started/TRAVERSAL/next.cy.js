it("obtiene el elemento siguiente de un elemento referencia dado,",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-ul es la clase de la lista desordenada (ul)
    //apples es el elemento de referencia
    cy.get('.traversal-ul').contains('apples').next().should('contain', 'oranges')
                                                                    //oranges es el elemento siguiente a localizar
})