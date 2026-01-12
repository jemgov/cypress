    it("verificar la clase css de un botón",()=>{
        cy.visit("https://example.cypress.io/commands/actions")
        cy.get('.action-form > .btn').should("have.class","btn btn-primary")     
                //verifica que el elemento tiene la clase css especificada
    })