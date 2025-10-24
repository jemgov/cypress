it("Recargar la página",()=>{
    cy.visit("https://example.cypress.io/commands/navigation")
    cy.reload()

//recarga la página sin usar la caché
cy.reload(true)
})