describe('Login usando servidor simulado', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080/login.html')
  })

  it('Login correcto usando la interfaz', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { token: 'fake-token' }
    }).as('loginOk')

    cy.get('#username').type('jesus')
    cy.get('#password').type('1234')
    cy.get('#login-btn').click()

    cy.wait('@loginOk')
    cy.get('#mensaje').should('contain.text', 'Login correcto')
  })

  it('Login incorrecto usando la interfaz', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { error: 'Credenciales incorrectas' }
    }).as('loginFail')

    cy.get('#username').type('jesus')
    cy.get('#password').type('wrong')
    cy.get('#login-btn').click()

    cy.wait('@loginFail')
    cy.get('#mensaje').should('contain.text', 'Credenciales incorrectas')
  })

})