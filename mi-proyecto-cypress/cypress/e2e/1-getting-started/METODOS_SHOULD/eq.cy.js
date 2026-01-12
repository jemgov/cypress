    it("visitar la pagina y verificar url",()=>{
        cy.visit("https://example.cypress.io/todo")
        cy.url().should("eq","https://example.cypress.io/todo")      //compara que la url sea la misma que la visitada
    })