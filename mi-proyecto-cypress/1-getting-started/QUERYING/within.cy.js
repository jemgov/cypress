  it('Obtener elementos de entrada dentro de un formulario', () => {
    cy.visit('https://example.cypress.io/commands/querying')

    cy.get('.query-form').within(() => {
    cy.get('input:first').should('have.attr', 'placeholder', 'Email')
    cy.get('input:last').should('have.attr', 'placeholder', 'Password')
        })
    })