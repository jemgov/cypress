/// <reference types="cypress" />

describe('HUDR_2.3 – Fallos y pendientes', () => {

  let pacientes;
  let medicamentos;

  before(() => {
    cy.fixture('pacientes').then(data => pacientes = data);
    cy.fixture('medicamentos').then(data => medicamentos = data);
  });

  it('F29 - Paciente inexistente debe existir (fallo esperado)', () => {
    cy.allure().owner('Marta Rodríguez');
    cy.allure().severity('critical');
    cy.allure().feature('urgencias');

    const p = pacientes.find(p => p.id === 999999);
    expect(p).to.not.be.undefined;
  });

  it('F30 - Área inexistente debe existir (fallo esperado)', () => {
    cy.allure().owner('Alberto Marchena');
    cy.allure().severity('critical');
    cy.allure().feature('UCI');

    const p = pacientes.find(p => p.area === 'cardiologia');
    expect(p).to.not.be.undefined;
  });

  it('F31 - Número incorrecto de pacientes (fallo esperado)', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('critical');
    cy.allure().feature('hospital');

    expect(pacientes.length).to.equal(5);
  });

  it('F32 - Todos los medicamentos deben ser críticos (fallo esperado)', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('critical');
    cy.allure().feature('medicación');

    medicamentos.forEach(m => expect(m.critico).to.be.true);
  });

  it('F33 - Solo debe haber un proveedor (fallo esperado)', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('critical');
    cy.allure().feature('medicación');

    const proveedores = new Set(medicamentos.map(m => m.proveedor));
    expect(proveedores.size).to.equal(1);
  });

  it('F34 - No debe haber pacientes en urgencias (fallo esperado)', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('critical');
    cy.allure().feature('urgencias');

    expect(pacientes.filter(p => p.area === 'urgencias').length).to.equal(0);
  });

  it('F35 - No debe haber medicamentos no críticos (fallo esperado)', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('critical');
    cy.allure().feature('medicación');

    expect(medicamentos.filter(m => !m.critico).length).to.equal(0);
  });

  it('S36 - Pendiente de integración con laboratorio', function () {
    cy.allure().owner('Marta Rodríguez');
    cy.allure().severity('minor');
    cy.allure().feature('hospital');

    this.skip();
  });

  it('S37 - Pendiente de agenda quirúrgica', function () {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('minor');
    cy.allure().feature('urgencias');

    this.skip();
  });

  it('S38 - Pendiente de reglas de priorización', function () {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('minor');
    cy.allure().feature('UCI');

    this.skip();
  });

  it('S39 - Pendiente de informes radiológicos', function () {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('minor');
    cy.allure().feature('hospital');

    this.skip();
  });

  it('B40 - Error inesperado en servicio de camas', () => {
    cy.allure().owner('Alberto Marchena');
    cy.allure().severity('blocker');
    cy.allure().feature('UCI');

    throw new Error('Error inesperado en módulo de gestión de camas');
  });

});
