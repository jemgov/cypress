it("Distribuye una matriz como argumentos individuales a una función de devolución de llamada",()=>{
cy.visit('https://example.cypress.io/commands/connectors')
const arr = ['foo', 'bar', 'baz']   //declara una matriz llamada "arr" que contiene 3 elementos

cy.wrap(arr).spread(function(primerTrozo, segundoTrozo, tercerTrozo){
  expect(primerTrozo).to.eq('foo')
  expect(segundoTrozo).to.eq('bar')
  expect(tercerTrozo).to.eq('baz')
})
})