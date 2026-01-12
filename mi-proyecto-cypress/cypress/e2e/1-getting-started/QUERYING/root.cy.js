  it('Encontrar el elemento raíz del DOM', () => {
    cy.visit('https://example.cypress.io/commands/querying')
    
    cy.root().should('match', 'html')
        cy.get('.query-ul').within(() => {
        cy.root().should('have.class', 'query-ul')
        })
    })