it("obtiene los elementos padre hasta otro elemento",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.clothes-nav es la clase de la lista desordenada (ul)
    //.active es el elemento "pants"
    //parentsUntil indica el elemento hasta donde debe buscar
    //devuelve los 2 elementos padre hasta .clothes-nav
    cy.get('.clothes-nav').find('.active').parentsUntil('.clothes-nav').should('have.length', 2)    //2: ul y list-item
})



//explicación:
//hasta: .clothes-nav
    //li
    //ul class="menu"