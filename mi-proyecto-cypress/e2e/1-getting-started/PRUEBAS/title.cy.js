    it("verificar titulo de la url",()=>{
        cy.visit("https://www.paypal.com/es/home")
        cy.title().should('include', 'Enviar Dinero | Cartera Digital y Gestión de Dinero | PayPal ES')
    })