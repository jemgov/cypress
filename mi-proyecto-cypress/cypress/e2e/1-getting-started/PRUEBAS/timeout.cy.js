describe("Manejo de errores timeout",() =>{
    it("Ajusta el timeout para esperar contenido dinamico",()=>{
        cy.visit("https://the-internet.herokuapp.com/dynamic_loading/1")
        cy.get("button").click()
        cy.wait(7000)
        cy.log("Terminando la espera de 7 segundos")
        cy.get('#finish > h4').should("be.visible").get("h4").should("contain","Hello World!")
    })
})