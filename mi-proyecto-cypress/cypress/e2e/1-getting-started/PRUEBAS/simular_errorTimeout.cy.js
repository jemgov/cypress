describe('Simular timeout', () => {
  it('Intercepta GET con retraso', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.intercept('GET', '/api/products', (req) => {
      req.on('response', (res) => {
        res.setDelay(5000)
      })
    }).as('slowProducts')

    cy.window().then(win => {
      win.fetch('/api/products')
    })

    cy.wait('@slowProducts', { timeout: 6000 })
  })
})