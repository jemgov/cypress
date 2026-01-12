describe("clase css",() =>{
    it("verifica que no tiene la clase css de un botón",()=>{
        cy.visit("https://example.cypress.io/commands/actions")
        cy.get('.action-form > .btn').should("not.have.class","btn btn-primari") 
                //verifica que el elemento no tiene la clase css especificada
    })
})