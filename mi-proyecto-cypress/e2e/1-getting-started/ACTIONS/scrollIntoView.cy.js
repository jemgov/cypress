//se utiliza para indicar a cypress qué elemento/s queremos que busque
  it('Desplaza un elemento a la vista', () => {
    cy.visit("https://example.cypress.io/commands/actions")
    // https://on.cypress.io/scrollintoview

    // normally all of these buttons are hidden,
    // because they're not within
    // the viewable area of their parent
    // (we need to scroll to see them)
   
    // Ejemplo 1
    cy.get('#scroll-horizontal button').should('not.be.visible')  //verifica que el botón no está visible
    
    // scroll the button into view, as if the user had scrolled
    cy.get('#scroll-horizontal button').scrollIntoView()
    cy.get('#scroll-horizontal button').should('be.visible')    //verifica que el botón está visible

    
    // Ejemplo 2
    cy.get('#scroll-vertical button').should('not.be.visible')

    // Cypress handles the scroll direction needed
    cy.get('#scroll-vertical button').scrollIntoView()
    cy.get('#scroll-vertical button').should('be.visible')


    // Ejemplo 3
    cy.get('#scroll-both button').should('not.be.visible')

    // Cypress knows to scroll to the right and down
    cy.get('#scroll-both button').scrollIntoView()
    cy.get('#scroll-both button').should('be.visible')
  })