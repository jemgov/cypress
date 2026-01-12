describe('Simular error de red', () => {
  it('Intercepta GET y fuerza fallo de red', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.intercept('GET', '/api/data', {
      forceNetworkError: true
    }).as('networkFail')

    cy.window().then(win => {
      return win.fetch('/api/data').catch(() => {}) // Evita que el test falle por fetch
    })

    cy.wait('@networkFail')
  })
})