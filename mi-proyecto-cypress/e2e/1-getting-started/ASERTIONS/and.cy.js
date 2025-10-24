it("Encadena varias verificaciones consecutivas",() =>{
    cy.visit('https://example.cypress.io/commands/assertions')
    cy.get('.assertions-link').should('have.class', 'active').and('have.attr', 'href').and('include', 'cypress.io')
})      //verifica si "assertions-link" tiene la clase "active", el atributo "href" y si incluye el texto "cypress.io"