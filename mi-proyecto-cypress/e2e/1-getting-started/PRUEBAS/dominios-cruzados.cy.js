describe("Manejo de múltiples dominios", () => {
  it("Interactuar con varios dominios", () => {
    cy.visit("https://example.com")   // Dominio principal

    cy.origin("https://the-internet.herokuapp.com", () => {
      cy.visit("/")
      cy.get("h1").should("contain.text", "Welcome to the-internet")
    })

    cy.origin("https://validaciones.rodrigovillanueva.com.mx", () => {
      cy.visit("/")
      cy.get("body").should("exist")
    })
  })
})


//Dominios cruzados:
    //Uso de cy.origin()

//Problema previo
    //Antes de la ver 9.6 de cypress solamente se podía manejar un dominio principal
    //Si hacias un cy.visit("otro dominio") el navegador fallaba por las restricciones de seguridad
    //Otras soluciones:
        //Abrir una nueva pestaña

    //Solución con cy.origin()
        //Sintaxis: cy.origin("https://www.otrodominio.com")