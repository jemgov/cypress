    it("verificar atributo css",()=>{
        cy.visit("https://example.cypress.io/commands/querying")
        cy.get('.example').should("have.attr","data-test-id","test-example")    //verifica el atributo css de un elemento
                                //('have.attr', 'atributo', 'valor')
    })