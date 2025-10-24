    it("Verificar checkbox marcado",()=>{
        cy.visit("https://example.cypress.io/todo")
        cy.get(':nth-child(1) > .view > .toggle').check()
    })