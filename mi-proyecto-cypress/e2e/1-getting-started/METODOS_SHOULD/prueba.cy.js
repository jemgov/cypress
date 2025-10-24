describe("Verificar banner y título",() =>{
    it("visitar la pagina y marcar una tarea como terminada",()=>{
        cy.visit("https://example.cypress.io/")
        cy.get(".banner").should("be.visible")
        cy.get(".banner").should('be.not.empty')
        cy.get('#navbar').should("contain.text","Commands",).should("contain.text","Utilities")
    })
})