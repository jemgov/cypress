describe("elemento visible",() =>{
    it("verificar que el elemento está visible",()=>{
        cy.visit("https://opencart.abstracta.us/index.php?route=common/home")
        .get(".col-sm-4").should("be.visible")      //titulo de la página
    })
})