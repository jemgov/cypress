  it('Activa elementos programáticamente', () => {
    cy.visit("https://example.cypress.io/commands/actions")
    // https://on.cypress.io/trigger

    // To interact with a range input (slider)
    // we need to set its value & trigger the
    // event to signal it changed

    // Here, we invoke jQuery's val() method to set
    // the value and trigger the 'change' event
    cy.get('.trigger-input-range').invoke('val', 25)  //selecciona el valor 25 del rango
    cy.get('.trigger-input-range').trigger('change')  //activa el evento change
    cy.get('.trigger-input-range').get('input[type=range]').siblings('p').should('have.text', '25')
                                //verifica que el rango seleccionado es 25 (el valor se encuentra dentro de la etiqueta <p>)
  })