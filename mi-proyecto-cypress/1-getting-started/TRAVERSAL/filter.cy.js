it("obtiene elementos del DOM que coincidan con un selector específico",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-nav es la clase de la lista desordenada (ul)
    //.active es la clase de la lista (li) de la opción activa (About)
    cy.get('.traversal-nav>li').filter('.active').should('contain', 'About')
})