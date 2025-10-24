describe("Manejo de dominios cruzados",()=>{
    it("Interactuar con dominios diferentes",()=>{
        cy.visit("https://example.com")     //dominio principal
        cy.origin("https://the-internet.herokuapp.com",()=>{    //dominio secundario
            cy.visit("https://the-internet.herokuapp.com")
            cy.visit("https://validaciones.rodrigovillanueva.com.mx/")
            //cy.get("h1").should("contain.text","Welcome to the-internet")
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