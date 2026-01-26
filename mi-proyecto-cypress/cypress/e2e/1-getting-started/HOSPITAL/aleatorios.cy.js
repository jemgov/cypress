/// <reference types="cypress" />

describe('HUDR_2.3 – Tests aleatorios', () => {

  it('FL01 - Validación aleatoria de paciente crítico', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('minor');
    cy.allure().feature('UCI');

    const r = Math.random();
    expect(r).to.be.greaterThan(0.3);
  });

  it('FL02 - Validación aleatoria de proveedor activo', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('normal');
    cy.allure().feature('medicación');

    const r = Math.random();
    expect(r).to.be.lessThan(0.8);
  });

  it('FL03 - Validación aleatoria de nombre de paciente', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('minor');
    cy.allure().feature('urgencias');

    const r = Math.random();
    expect(r).to.be.greaterThan(0.5);
  });

});
