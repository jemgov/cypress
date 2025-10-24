it("Verifica la propiedad de codificación del documento",()=>{
    cy.visit("https://example.cypress.io/commands/window")
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
            //verifica que el documento tenga la propiedad "charset" y que ésta sea igual a "UTF-8"
})