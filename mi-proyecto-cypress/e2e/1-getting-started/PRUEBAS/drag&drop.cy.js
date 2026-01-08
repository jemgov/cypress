// cypress/e2e/actions_drag_drop.cy.js
describe('Pruebas de mouse: hover, click y drag', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions')
  })

  it('Realiza hover y click en el botón', () => {
    // Hacemos hover y click forzado
    cy.get('.action-btn').should('be.visible').trigger('mouseover').click({ force: true })

    // Validamos que el botón sigue siendo visible
    cy.get('.action-btn').should('be.visible')
  })

  it('Simula arrastre con coordenadas en el canvas', () => {
    cy.get('#action-canvas').should('be.visible')
      // Iniciamos el arrastre
      .trigger('mousedown', { which: 1, pageX: 200, pageY: 100 })
      // Movemos el mouse
      .trigger('mousemove', { which: 1, pageX: 250, pageY: 150 })
      // Soltamos el mouse
      .trigger('mouseup')
  })
})