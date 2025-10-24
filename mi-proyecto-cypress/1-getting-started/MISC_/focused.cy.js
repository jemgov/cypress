it("Obtiene el elemento DOM que tiene el foco",() =>{
    cy.visit('https://example.cypress.io/commands/misc')
cy.get('.misc-form').find('#name').click()
cy.focused().should('have.id', 'name')

cy.get('.misc-form').find('#description').click()
cy.focused().should('have.id', 'description')
})