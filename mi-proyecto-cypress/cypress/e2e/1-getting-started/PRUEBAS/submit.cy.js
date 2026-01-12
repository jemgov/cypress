//método 1
describe("Escribir en una caja de texto y enviar formulario",() =>{

  it('.submit() - submit a form', () => {
    cy.visit("https://example.cypress.io/commands/actions")

    cy.get('.action-form').find('[type="text"]').type('HALFOFF')
    cy.get('.action-form').submit()
    cy.get('.action-form').next().should('contain', 'Your form has been submitted!')
  })
})


//método 2
describe("Escribir en una caja de texto y enviar formulario",() =>{

  it('.submit() - submit a form', () => {
    cy.visit("https://example.cypress.io/commands/actions")

    cy.get('.action-form')
    cy.get("#couponCode1").type('HALFOFF')
    cy.get('.action-form').submit()
    cy.get('.well > p').should('have.text', 'Your form has been submitted!')
  })
})