describe("Prueba de beforeEach",() =>{      //beforeEach se ejecuta antes de cada prueba "it"
    beforeEach(()=>{     //sirve para ejecutar un bloque de código antes de cada prueba individual dentro de un archivo de prueba
        cy.visit("/")   //Si tienes múltiples pruebas en un archivo, beforeEach se ejecutará antes de cada una de ellas
        //cy.visit("https://example.cypress.io/")
    })
    it("navega a una url dinámica y valida el contenido",()=>{
        cy.visit("/commands/actions")
        cy.url().should("include","/commands/actions")
        cy.get("h1").should("contain.text","Actionss")
        cy.wait(4000)
    })
    it("validar una segunda ruta",()=>{
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()
        cy.url().should("include","/commands/traversal")
        cy.get("h1").should("contain.text","Traversall")
    })
})