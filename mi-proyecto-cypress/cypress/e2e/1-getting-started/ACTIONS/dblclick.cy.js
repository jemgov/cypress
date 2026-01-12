  it('Doble clic de ratón sobre un elemento', () => {
        cy.visit("https://example.cypress.io/commands/actions")
        //https://docs.cypress.io/api/commands/dblclick
    // Our app has a listener on 'dblclick' event in our 'scripts.js'
    // that hides the div and shows an input on double click
    cy.get('.action-div').dblclick()
    
    //cy.get('.action-div').should('have.text',"Double click to edit")

    cy.get('.action-div').should('not.be.visible')      //verifica que no está visible
    cy.get('.action-input-hidden').should('be.visible') //verifica que está visible
  })