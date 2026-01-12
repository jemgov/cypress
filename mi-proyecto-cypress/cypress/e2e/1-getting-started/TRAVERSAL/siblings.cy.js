it("obtiene todos los elementos hermanos de los elementos",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-pills es la clase del elemento de lista desordenada (ul)
    //.active indica la opción que esté activa (Home)
    //have.length verifica que son 2 los elementos hermanos
    cy.get('.traversal-pills .active').siblings().should('have.length', 2)  //2: Profile y Messages
})