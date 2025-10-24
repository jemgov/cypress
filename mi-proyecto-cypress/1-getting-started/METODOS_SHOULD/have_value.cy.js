describe("Verificar valor de input o textarea",() =>{
    it("verificar valor de input o textarea",()=>{
        cy.visit("https://example.cypress.io/commands/actions")
        cy.get('#fullName1').type("esto es un texto").should("have.value","esto es un texto") 
                                //verifica el atributo value de un elemento (por ejemplo un campo de entrada)
    })
})