it("Verifica el título de la página",()=>{
        cy.visit("https://example.cypress.io/commands/window")
        cy.title().should('include', 'Kitchen Sink')
                //verifica que el título de la página (title) contenga la cadena "Kitchen Sink"
        cy.title().should('eq', 'Cypress.io: Kitchen Sink')
                //verifica que el título de la página (title) sea exactamente "Cypress.io: Kitchen Sink"
        cy.title().should('not.include', 'el titulo')
                //verifica que el título de la página (title) NO contenga la cadena "el titulo"
})