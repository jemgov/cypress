describe("verifica propiedad css de un botón",() =>{
    it("verifica propiedad css con invoke",()=>{
        cy.visit("https://example.cypress.io/commands/actions")
        cy.get('.well > .btn-danger').invoke("css","overflow").should("eq","visible")
    })                          //"overflow" es la propiedad css      //"visible" es el valor de la propiedad overflow
})