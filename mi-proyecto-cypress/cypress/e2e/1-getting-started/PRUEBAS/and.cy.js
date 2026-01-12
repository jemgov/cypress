describe("Encadena varias verificaciones consecutivas",() =>{
    it("verifica propiedad css y su valor",()=>{
        cy.visit("https://example.cypress.io/commands/actions")
        cy.get('.well > .btn-danger').should("css","overflow").and("eq","visible")
    })
})