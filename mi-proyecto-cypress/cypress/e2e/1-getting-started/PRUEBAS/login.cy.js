/*it('Login completo con verificación de sesión', () => {
  cy.request({
    method: 'POST',
    url: 'https://practicetestautomation.com/practice-test-login/',
    form: true,
    body: {
      Email1: 'student',
      Password: 'Password123',
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
})*/

it('Login correcto usando la interfaz', () => {
  cy.visit('https://practicetestautomation.com/practice-test-login/')

  cy.get('input[name="username"], #username').type('student')
  cy.get('input[name="password"], #password').type('Password123')
  cy.contains('button, input[type="submit"]', 'Submit').click()

  cy.url().should('include', '/logged-in-successfully/')
  cy.contains('.post-title, h1', 'Logged In Successfully').should('exist')
})
