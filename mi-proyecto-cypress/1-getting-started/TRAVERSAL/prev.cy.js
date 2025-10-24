it("obtiene el elemento hermano anterior dentro de elementos",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.birds es la clase de la lista desordenada (ul)
    //.active es la opción activa de la lista (Cockatoos)
    //prev devolverá el valor anterior a Cockatoos (Lorikeets)
    cy.get('.birds').find('.active').prev().should('contain', 'Lorikeets')
})