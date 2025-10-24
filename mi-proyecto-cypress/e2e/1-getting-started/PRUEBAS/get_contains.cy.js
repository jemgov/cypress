//método 1
describe('Función contains', () => {
  it('Selecciona elemento de una lista', () => {
    cy.visit('https://example.cypress.io/commands/querying')

cy.get('.query-list').contains('bananas').should('have.class', 'third') //busca el elemento de la lista por clase "third"

cy.get('.query-button').contains('Save Form').should('have.class', 'btn') //guarda el formulario
  })
})


//método 2
describe('Función contains', () => {
  it('Selecciona elemento de una lista', () => {
    cy.visit('https://example.cypress.io/commands/querying')

cy.get('#querying').contains('ul', 'bananas').should('have.class', 'query-list') //busca el elemento de la lista por clase "query-list"

cy.get('.query-button').contains('Save Form').should('have.class', 'btn') //guarda el formulario
  })
})