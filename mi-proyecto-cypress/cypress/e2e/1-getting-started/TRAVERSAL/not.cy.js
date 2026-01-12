it("Elimina elementos del conjunto de elementos",()=>{
    cy.visit("https://example.cypress.io/commands/traversal")
    //.traversal-disabled es la clase del div que abarca los botones
    //not('[disabled]') indica que ignore los botones que tengan la propiedad css "disabled"
    //not.contain verifica que el botón que queda NO contenga en su nombre "Disabled"
    cy.get('.traversal-disabled .btn').not('[disabled]').should('not.contain', 'Disabled')
})