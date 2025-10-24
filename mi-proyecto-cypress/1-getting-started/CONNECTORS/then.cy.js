it("Invoca una función de devolución de llamada con el asunto actual",()=>{
cy.visit('https://example.cypress.io/commands/connectors')
cy.get('.connectors-list>li').then(function($lis){  //llama a una función $lis que contiene los 3 elementos
  expect($lis).to.have.length(3)        //se espera que la lista contenga 3 elementos
  expect($lis.eq(0)).to.contain('Walk the dog') //se espera que el índice 0 sea "Walk the dog"
  expect($lis.eq(1)).to.contain('Feed the cat') //se espera que el índice 1 sea "Fee the cat"
  expect($lis.eq(2)).to.contain('Write JavaScript') //se espera que el índice 2 sea "Write JavaScript"
})
})