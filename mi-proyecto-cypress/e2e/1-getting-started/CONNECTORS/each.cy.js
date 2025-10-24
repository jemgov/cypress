it("itera sobre los elementos de un elemento actual",()=>{
cy.visit('https://example.cypress.io/commands/connectors')
  cy.get('.connectors-each-ul>li').each(function($el, index, $list){console.log($el, index, $list)
  })    //"connectors-each-ul" es la clase de la lista desordenada (lu)
})