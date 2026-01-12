describe("Verificar checkbox seleccionado",() =>{
    it("verificar checkbox seleccionado",() =>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('.action-checkboxes > :nth-child(1) > label > input').click()
        cy.get('.action-checkboxes > :nth-child(1) > label > input').should("be.checked","checkbox1")
    })
})