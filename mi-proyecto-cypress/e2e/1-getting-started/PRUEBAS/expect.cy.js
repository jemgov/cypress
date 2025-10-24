describe("Número de contenedores de la página",() =>{
    it("visitar la pagina y marcar una tarea como terminada",()=>{
        cy.visit("https://example.cypress.io/")
        cy.get(".container").then((items)=>{
            const numeroDeItems = items.length //8 items     //devuelve el nº de container
            expect(numeroDeItems).to.equal(8)
        })
    })
})