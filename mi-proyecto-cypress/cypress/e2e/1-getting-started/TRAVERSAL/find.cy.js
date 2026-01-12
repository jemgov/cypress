it("obtiene elementos del DOM descendientes del selector,",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-pagination es la clase de la lista desordenada (ul)
    //find "li" son los elementos de lista
    //find "a" son los elementos "a href" de cada elemento "li"
    //have.length verifica el nº de elementos
cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7)   //el nº de elementos "a" es 7
})