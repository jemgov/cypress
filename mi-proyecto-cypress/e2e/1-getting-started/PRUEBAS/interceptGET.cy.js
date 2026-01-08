describe("Interceptar y simular solicitudes",() =>{
    it("intercepta y simula búsqueda en google",()=>{
        cy.intercept("GET","https://www.google.com/search",{
            statusCode: 200,
            body: "<html><body><h1>Simulado respuesta de google</h1></body></html>"
        }).as("searchGoogle")

        cy.visit("https://www.google.com")
        cy.get('#L2AGLb > .QS5gu').click()
        cy.get("#APjFqb").type("Cypress intercept example{enter}")
        cy.wait("@searchGoogle")
        cy.contains("Simulado respuesta de google").should("exist")
    })
})



//cy.intercept(method,URL,response)
//Monitoreo: solo observar sin modificarlas
//Mocking: devolver una respuesta ficticia para simular el servidor
//Modificacion: cambiar la repuesta del servidor
