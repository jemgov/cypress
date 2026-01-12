it("Verifica la propiedad de la ventana",()=>{
    cy.visit("https://example.cypress.io/commands/window")
    cy.window().should('have.property', 'top') 
    //En los navegadores, window.top siempre existe y hace referencia al marco superior de la ventana


    //Otras verificaciones con cy.window()
    cy.window().should("have.property", "navigator")
    cy.window().its("navigator.userAgent").should("include", "Chrome")


    cy.window().then((win) => {
    //Guardar algo en localStorage
    win.localStorage.setItem("usuario", "Jesus")

    //Verificar que la clave existe
    expect(win.localStorage.getItem("usuario")).to.equal("Jesus")
})
})