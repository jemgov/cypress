it("invoca una función jqueryt para un elemento",()=>{
cy.visit('https://example.cypress.io/commands/connectors')
    cy.get('.connectors-div').should('be.hidden').invoke('show').should('be.visible')
    //"connectors-div" es la clase del elemento que está oculto (be.hidden)
  //llama a la función "show" de jquery en el elemento "div.container"
    })