describe("Verificar id del elemento",() =>{
    it("verificar id del elemento",()=>{
        cy.visit("https://example.cypress.io/commands/querying")
        cy.get('#query-btn').should("have.id","query-btn")      //verifica el id de un elemento
    })
})