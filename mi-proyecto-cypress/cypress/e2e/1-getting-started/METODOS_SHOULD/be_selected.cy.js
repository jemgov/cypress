describe("Verificar opción select seleccionado",() =>{
    it("verificar opción select seleccionado",() =>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('.action-select').select("fr-apples")
        //cy.get('.action-select').find('option[value="fr-apples"]')
    })
})