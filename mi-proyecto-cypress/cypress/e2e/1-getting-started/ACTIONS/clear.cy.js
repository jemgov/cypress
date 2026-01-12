describe("Función clear",() =>{
  it('.clear() - Limpia una entrada de texto, elemento de tipo textarea', () => {
    cy.visit('https://example.cypress.io/commands/actions')
    cy.get('.action-clear').type('Esto es un texto')
    cy.get('.action-clear').should('have.value', 'Esto es un texto')    //verifica que el texto escrito coincide
    cy.wait(4000)
    cy.get('.action-clear').clear()                         //elimina el texto escrito anteriormente
    cy.get('.action-clear').should('have.value', '')        //comprueba que no existe texto y que el texto ha sido borrado
  })
})