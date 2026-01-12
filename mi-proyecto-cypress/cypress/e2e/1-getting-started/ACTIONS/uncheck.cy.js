  it('Verificar checkbox no seleccionado', () => {
    cy.visit("https://example.cypress.io/commands/actions")
    // https://on.cypress.io/uncheck

    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck()
    cy.get('.action-check [type="checkbox"]').not('[disabled]').should('not.be.checked')
        //cy.get('.action-check > :nth-child(1) > label > input').check()
        //cy.get('.action-check > :nth-child(1) > label > input').uncheck()
  })