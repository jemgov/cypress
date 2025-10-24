describe("Verificar checkbox no seleccionado",() =>{
    it("verificar checkbox no seleccionado",() =>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('.action-checkboxes > :nth-child(1) > label > input').click()
        cy.get('.action-checkboxes > :nth-child(3) > label > input').should("not.be.checked","checkbox3")
                //verifica que el checkbox no está seleccionado
    })
})