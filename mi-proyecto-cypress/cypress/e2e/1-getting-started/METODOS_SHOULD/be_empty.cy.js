describe("Input de entrada de texto vacío",() =>{
    it("validar que el input está vacío",()=>{
        cy.visit("https://example.cypress.io/commands/actions")
        cy.get("#couponCode1").should("be.empty")
    })
})