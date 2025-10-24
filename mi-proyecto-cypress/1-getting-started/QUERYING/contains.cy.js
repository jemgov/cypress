  it('Interactúa con los inputs del apartado Waiting', () => {
    // 1. Acceder a la URL
    cy.visit('https://example.cypress.io/')

    // 2. Clic en el menú "Commands"
    cy.contains('Commands').click()     //contains localiza el elemento que contiene el texto indicado entre ()

    // 3. Clic en la opción "Waiting"
    cy.contains('Waiting').click()

    // 4. Escribe en los tres inputs
    // localiza con "get" la entrada de texto, con "click" la selecciona y con "type" escribe
    cy.get(':nth-child(1) > .form-control').click().type("hola")
    cy.get(':nth-child(2) > .form-control').click().type("que")
    cy.get(':nth-child(3) > .form-control').click().type("tal")
    
    // 5. Clic en el botón "Get Comment"
    cy.get('.network-btn').click()
  });