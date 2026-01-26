/// <reference types="cypress" />

describe('HUDR_2.3 – Pacientes', () => {

  let pacientes;

  before(() => {
    cy.fixture('pacientes').then(data => pacientes = data);
  });

  it('P01 - Validación de pacientes en UCI', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('critical');
    cy.allure().feature('UCI');

    expect(pacientes.filter(p => p.area === 'UCI').length).to.be.greaterThan(0);
  });

  it('P02 - IDs numéricos', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('normal');
    cy.allure().feature('urgencias');

    pacientes.forEach(p => expect(p.id).to.be.a('number'));
  });

  it('P04 - Estructura mínima de paciente', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('minor');
    cy.allure().feature('urgencias');

    const p = pacientes[0];
    expect(p).to.have.property('nombre');
    expect(p).to.have.property('apellido1');
  });

  it('P05 - Pacientes en urgencias', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('normal');
    cy.allure().feature('urgencias');

    expect(pacientes.filter(p => p.area === 'urgencias').length).to.be.greaterThan(0);
  });

  it('P07 - Pacientes pediátricos existen', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('minor');
    cy.allure().feature('urgencias');

    expect(pacientes.filter(p => p.area === 'pediatria').length).to.be.greaterThan(0);
  });

  it('P09 - Pacientes en neurología', () => {
    cy.allure().owner('Alberto Marchena');
    cy.allure().severity('normal');
    cy.allure().feature('UCI');

    expect(pacientes.filter(p => p.area === 'neurologia').length).to.be.greaterThan(0);
  });

  it('P15 - Pacientes con apellidos válidos', () => {
    cy.allure().owner('Marcha Rodríguez');
    cy.allure().severity('minor');
    cy.allure().feature('urgencias');

    pacientes.forEach(p => {
      expect(p.apellido1).to.be.a('string').and.not.be.empty;
      expect(p.apellido2).to.be.a('string').and.not.be.empty;
    });
  });

  it('P16 - Pacientes con letra A en el nombre', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('minor');
    cy.allure().feature('urgencias');

    expect(pacientes.filter(p => /a/i.test(p.nombre)).length).to.be.greaterThan(0);
  });

  it('P17 - Pacientes en más de 5 áreas', () => {
    cy.allure().owner('Carlos Sánchez');
    cy.allure().severity('normal');
    cy.allure().feature('UCI');

    const areas = new Set(pacientes.map(p => p.area));
    expect(areas.size).to.be.greaterThan(5);
  });

  it('P20 - Pacientes con ID > 50000', () => {
    cy.allure().owner('Marta Rodríguez');
    cy.allure().severity('normal');
    cy.allure().feature('urgencias');

    expect(pacientes.filter(p => p.id > 50000).length).to.be.greaterThan(0);
  });

  it('P22 - Pacientes con nombre que empieza por vocal', () => {
    cy.allure().owner('Marta Rodríguez');
    cy.allure().severity('minor');
    cy.allure().feature('urgencias');

    expect(pacientes.filter(p => /^[AEIOU]/i.test(p.nombre)).length).to.be.greaterThan(0);
  });

  it('P24 - Pacientes en oncología', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('normal');
    cy.allure().feature('urgencias');

    expect(pacientes.filter(p => p.area === 'oncologia').length).to.be.greaterThan(0);
  });

  it('P25 - Pacientes en traumatología', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('minor');
    cy.allure().feature('UCI');

    expect(pacientes.filter(p => p.area === 'traumatologia').length).to.be.greaterThan(0);
  });

  it('P26 - Pacientes en rehabilitación', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('normal');
    cy.allure().feature('urgencias');

    expect(pacientes.filter(p => p.area === 'rehabilitacion').length).to.be.greaterThan(0);
  });

});
