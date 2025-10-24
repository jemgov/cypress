describe("Verificar elemento existente",() =>{
    it("verificar elemento existente",() =>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('.action-form > .btn').should("exist")     //verifica que el elemento definido por su clase existe
    })
})