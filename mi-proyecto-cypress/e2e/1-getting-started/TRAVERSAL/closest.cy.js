it("verificar ancestros",()=>{       //obtiene elementos ancestros del DOM
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-badge es la clase del contenedor spam
    //list-group es la clase de la lista desordenada (ul)
    cy.get('.traversal-badge').closest('ul').should('have.class', 'list-group')
})