it("verificar hijo",()=>{       //obtiene elementos secundarios del DOM
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-breadcrumb es la clase de la lista ordenada (ol)
    //.active es la clase del elemento Data de la lista (li)
    cy.get('.traversal-breadcrumb').children('.active').should('contain', 'Data')
})