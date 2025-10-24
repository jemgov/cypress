    it("Escribe texto en un campo de entrada",()=>{
        cy.visit("https://example.cypress.io/todo")
        cy.get('[data-test="new-todo"]').type("hola desde cypress")
    })