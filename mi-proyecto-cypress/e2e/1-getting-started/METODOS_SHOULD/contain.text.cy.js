describe("verificar cadena de texto dentro de otra cadena",() =>{
    it("verificar cadena de texto dentro de otra cadena",()=>{
        cy.visit("https://example.cypress.io/commands/actions")
        cy.get('.container > p').should("contain.text","Cypress")  
                //verifica si la cadena de texto contiene una cadena concreta
    })
})