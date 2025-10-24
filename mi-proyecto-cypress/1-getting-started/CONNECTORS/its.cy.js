it("obtiene las propiedades del elemento actual",()=>{
cy.visit('https://example.cypress.io/commands/connectors')
    cy.get('.connectors-its-ul>li').its('length').should('be.gt', 2) //"be.gt" es mayor que -> 2 (existen 3 elementos)
            //"connectors-its-ul" es la clase del elemento lista desordenada (ul)
  // calls the 'length' property returning that value
})