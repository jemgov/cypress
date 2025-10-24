describe("Seleccionar una opción de un select desplegable",() =>{
    it("seleccionar opción de una lista",() =>{
        cy.visit("https://example.cypress.io/commands/actions")
        cy.get('.action-select').select("fr-oranges")       //por atributo
        //cy.get('.action-select').select("oranges")        //por nombre
    })
})



describe("Seleccionar de un select múltiples opciones a la vez y verificar sus valores",() =>{
    it("seleccionar múltiples opciones a la vez",() =>{
    cy.visit("https://example.cypress.io/commands/actions")
cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas'])
cy.get('.action-select-multiple').invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])
                        //Al obtener múltiples valores, invoque primero el método "val"
    })
})



describe("Verificar una opción incluida en un select múltiple",() =>{
    it("Verificar que un valor está incluido entre los seleccionados",() =>{
    cy.visit("https://example.cypress.io/commands/actions")
cy.get('.action-select-multiple').select(['oranges', 'bananas'])
cy.get('.action-select-multiple').invoke('val').should('include', 'fr-oranges')
    })
})