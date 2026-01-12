it("verificar elementos según índice",()=>{       //obtiene elementos del DOM según un índice específico
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-list es la clase de la lista desordenada (ul)
    cy.get('.traversal-list>li').eq(1).should('contain', 'siamese')
})