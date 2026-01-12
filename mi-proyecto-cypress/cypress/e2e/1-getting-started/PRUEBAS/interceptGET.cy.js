describe('Intercept GET y validación', () => {
  it('Simula un GET y valida el intercept', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1', {
      statusCode: 200,
      body: {
        userId: 1,
        id: 1,
        title: "Respuesta simulada",
        body: "Contenido interceptado"
      }
    }).as('fakePost')

    // Disparamos manualmente la petición GET desde el navegador
    cy.window().then(win => {
      return win.fetch('https://jsonplaceholder.typicode.com/posts/1')
    })

    cy.wait('@fakePost')
      .its('response.statusCode')
      .should('eq', 200)
  })
})



//cy.intercept(method,URL,response)
//Monitoreo: solo observar sin modificarlas
//Mocking: devolver una respuesta ficticia para simular el servidor
//Modificacion: cambiar la repuesta del servidor
