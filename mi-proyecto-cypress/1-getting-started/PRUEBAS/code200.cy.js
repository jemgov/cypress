it('Comprueba que el sitio web devuelve código 200', () => {
  cy.request('GET', 'https://www.marca.com').then((response) => {
      expect(response.status).to.eq(200)
    })
})