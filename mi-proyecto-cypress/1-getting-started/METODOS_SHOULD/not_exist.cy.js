describe("Verificar que el elemento no exista",() =>{
    it("verificar que el elemento no exista",() =>{
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('.boton-que-no-existe').should("not.exist")      //verifica que el elemento está definido por una clase ficticia
    })
})