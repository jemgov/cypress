describe("Pruebas de cypress",() =>{
    it("visitar la pagina y marcar una tarea como terminada",()=>{
        cy.visit("https://example.cypress.io/")
        cy.log("visitando el sitio de example")
        cy.get("h1").should("have.text","Kitchen Sink")
        cy.title().should("eq","Cypress.io: Kitchen Sink")
            cy.log("finalizando el test")
    })
})