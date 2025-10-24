it("Realiza una captura de pantalla",() =>{
    cy.visit('https://example.cypress.io/commands/misc')
cy.screenshot('my-image')       //nombre del fichero
})                              //la ruta del fichero será: cypress/screenshots/my-image.png