it("Enviar y validar formulario",()=>{
    cy.visit("https://example.cypress.io/commands/actions")
    cy.get("#couponCode1").type("12345")
        cy.get(".action-form").submit()
        //cy.get('.action-form > .btn').click()     //otro método válido
        cy.get(".well > p").should("have.text","Your form has been submitted!")     
        //verifica que el formulario se ha enviado correctamente
})
