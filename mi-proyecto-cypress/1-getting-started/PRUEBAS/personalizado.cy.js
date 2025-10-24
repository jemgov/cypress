//Características de comandos personalizados:
    //Reutilización
    //Legibilidad
    //Mantenimiento

describe("Prueba de comandos personalizados con login",() =>{
    it("Iniciar sesión con comando personalizado",()=>{
        cy.visit("https://the-internet.herokuapp.com/login")
        cy.login("tomsmith","SuperSecretPassword!")
        cy.get("#flash").should("contain.text","You logged into a secure area!")
    })
})