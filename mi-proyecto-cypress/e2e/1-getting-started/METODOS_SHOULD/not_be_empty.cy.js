describe("Verifica que el elemento no está vacío",() =>{
    it("verifica que el elemento no está vacío",()=>{
        cy.visit("https://opencart.abstracta.us/index.php?route=common/home")
        cy.get(".col-sm-4").should('not.be.empty')  //verifica que el elemento no está vacío
    })
})