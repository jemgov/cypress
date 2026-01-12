describe('Simulación visual de errores con Cypress', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080/timeout.html')
  })

  it('Simula respuesta lenta con spinner', () => {
    cy.intercept('GET', '/api/products/slow', (req) => {
      req.reply((res) => {
        res.setDelay(5000)
        res.send({
          statusCode: 200,
          body: [{ id: 1, name: 'Producto A' }]
        })
      })
    }).as('slowResponse')

    cy.get('#btn-slow').click()
    cy.get('#spinner').should('be.visible')

    cy.wait('@slowResponse', { timeout: 6000 })
    cy.get('#spinner').should('not.be.visible')
    cy.get('#result').should('contain.text', 'Productos cargados correctamente (200)')
  })

  it('Simula error 500 y muestra mensaje específico', () => {
    cy.intercept('GET', '/api/products/error500', {
      statusCode: 500,
      body: { error: 'Error interno del servidor' }
    }).as('serverError')

    cy.get('#btn-500').click()
    cy.wait('@serverError')

    cy.get('#spinner').should('not.be.visible')
    cy.get('#result').should('contain.text', 'Error interno del servidor (500)')
  })

  it('Simula error 404 y muestra mensaje específico', () => {
    cy.intercept('GET', '/api/products/notfound', {
      statusCode: 404,
      body: { error: 'Producto no encontrado' }
    }).as('notFound')

    cy.get('#btn-404').click()
    cy.wait('@notFound')

    cy.get('#spinner').should('not.be.visible')
    cy.get('#result').should('contain.text', 'Producto no encontrado (404)')
  })

  it('Simula error 403 y muestra mensaje específico', () => {
    cy.intercept('GET', '/api/products/forbidden', {
      statusCode: 403,
      body: { error: 'Acceso denegado' }
    }).as('forbidden')

    cy.get('#btn-403').click()
    cy.wait('@forbidden')

    cy.get('#spinner').should('not.be.visible')
    cy.get('#result').should('contain.text', 'Acceso denegado (403)')
  })

  it('Simula error 422 y muestra mensaje específico', () => {
    cy.intercept('GET', '/api/products/validation', {
      statusCode: 422,
      body: { error: 'Datos inválidos' }
    }).as('validation')

    cy.get('#btn-422').click()
    cy.wait('@validation')

    cy.get('#spinner').should('not.be.visible')
    cy.get('#result').should('contain.text', 'Error de validación (422)')
  })

  it('Simula fallo de red y muestra mensaje genérico', () => {
    cy.intercept('GET', '/api/products/networkfail', {
      forceNetworkError: true
    }).as('networkFail')

    cy.get('#btn-network').click()
    cy.wait('@networkFail')

    cy.get('#spinner').should('not.be.visible')
    cy.get('#result').should('contain.text', 'Fallo de red o error desconocido')
  })
})