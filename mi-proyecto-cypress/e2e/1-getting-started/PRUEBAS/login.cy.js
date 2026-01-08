it('Login completo con verificación de sesión', () => {
  cy.request({
    method: 'POST',
    url: 'https://practicetestautomation.com/practice-test-login/',
    form: true,
    body: {
      Email1: 'student',
      Password: 'Password123!',
      send: '1'
    }
  }).then((resp) => {
    expect(resp.status).to.eq(200)

    // Extraer cookies si el servidor las devuelve
    const cookies = resp.headers['set-cookie']
    if (cookies) {
      cookies.forEach((cookie) => {
        const parts = cookie.split(';')[0].split('=')
        cy.setCookie(parts[0], parts[1])
      })
    }

    // Visitar la página protegida
    cy.visit('https://practicetestautomation.com/logged-in-successfully/')
    cy.url().should('include', '/logged-in-successfully/')
    cy.get('.post-title').should('have.text', 'Logged In Successfully')
  })
})