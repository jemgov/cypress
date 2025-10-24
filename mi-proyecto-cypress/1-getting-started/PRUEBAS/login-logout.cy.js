describe("Prueba para validar login-logout",() =>{
    it("validar login y logout",()=>{
        cy.visit("https://the-internet.herokuapp.com/login")    //visita la página
        cy.get("#username").type("tomsmith")                    //escribe el nombre de usuario
        cy.get("#password").type("SuperSecretPassword!")        //escribe la contraseña
        cy.get("#login").submit()                               //envía el formulario
        cy.url().should("eq","https://the-internet.herokuapp.com/secure")   //verifica que la url del envío coincide
        cy.get('#flash').should('exist').contains("You logged into a secure area!")    //verifica que existe el mensaje de login OK

        //logout
        cy.get('.button').click()   //click en el botón para desloguearte
        cy.url().should("eq","https://the-internet.herokuapp.com/login")    //verifica que la url vuelve al inicio del login
    })

    
    //Prueba para verificar credenciales incorrectas
    it("validar login incorrecto",()=>{
        cy.visit("https://the-internet.herokuapp.com/login")    //visita la página
        cy.get("#username").type("usuario")     //escribe el nombre de usuario
        cy.get("#password").type("passw")       //escribe la contraseña
        cy.get("#login").submit()               //envía el formulario
        cy.url().should("eq","https://the-internet.herokuapp.com/login")    //verifica que la url vuelve al inicio del login
        cy.get('#flash').should("exist").contains("No puedes pasar")       //devolverá error porque el mensaje no corresponde
    })
})