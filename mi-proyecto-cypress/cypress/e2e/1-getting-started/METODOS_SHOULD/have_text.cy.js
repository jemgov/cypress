describe("Verifica una cadena de texto",() =>{
    it("verifica una cadena de texto",()=>{
        cy.visit("https://opencart.abstracta.us/index.php?route=common/home")
        //cy.get(".col-sm-4").should("be.visible")
        //cy.get(".col-sm-4").should('not.be.empty')
        cy.get('h1 > a').should("have.text","Your Store",)   //verifica una cadena de texto
    })
})