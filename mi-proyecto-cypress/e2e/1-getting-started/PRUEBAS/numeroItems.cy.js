describe('Menú Commands en Cypress Example', () => {
  it('Visita la página y cuenta los elementos del menú Commands', () => {
    // Visita la URL
    cy.visit('https://example.cypress.io/');

    // Hace clic en el menú "Commands"
    cy.contains('Commands').click();

    // Espera a que se despliegue el menú (por si hay una animación o retardo)
    cy.get('.dropdown-menu').should('be.visible');

    // Cuenta cuántos elementos hay en el menú desplegable
    cy.get('.dropdown-menu').find('a').then((items) => {
        const numeroItems = items.length;
        expect(numeroItems).to.equal(17)        //verifica que el menú contiene 17 elementos
        cy.log(`El menú contiene ${numeroItems} elementos.`);
      });
  });
});