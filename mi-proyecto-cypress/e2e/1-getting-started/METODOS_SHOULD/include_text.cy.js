describe("Verificar que los valores seleccionados incluyen naranjas",() =>{
    it("Verificar que un valor está incluido entre los seleccionados",() =>{
    cy.visit("https://example.cypress.io/commands/actions")
cy.get('.action-select-multiple').select(['oranges', 'bananas'])
cy.get('.action-select-multiple').invoke('val').should('include', 'fr-oranges') //verifica que el elemento está entre los seleccionados
cy.get('.action-select-multiple').should('include.text', 'oranges') //verifica que el texto del elemento contenga la subcadena
    })
})