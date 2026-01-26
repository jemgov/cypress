/// <reference types="cypress" />

describe('HUDR_2.3 – Fallos y pendientes', () => {

  let pacientes;
  let medicamentos;

  before(() => {
    cy.fixture('pacientes').then(data => pacientes = data);
    cy.fixture('medicamentos').then(data => medicamentos = data);
  });

  it('@owner:Marta Rodríguez @severity:critical @feature:urgencias F29 - Paciente inexistente debe existir (fallo esperado)', () => {
    const p = pacientes.find(p => p.id === 999999);
    expect(p).to.not.be.undefined;
  });

  it('@owner:Alberto Marchena @severity:critical @feature:UCI F30 - Área inexistente debe existir (fallo esperado)', () => {
    const p = pacientes.find(p => p.area === 'cardiologia');
    expect(p).to.not.be.undefined;
  });

  it('@owner:Jesús Gómez @severity:critical @feature:hospital F31 - Número incorrecto de pacientes (fallo esperado)', () => {
    expect(pacientes.length).to.equal(5);
  });

  it('@owner:José Manuel González @severity:critical @feature:medicación F32 - Todos los medicamentos deben ser críticos (fallo esperado)', () => {
    medicamentos.forEach(m => expect(m.critico).to.be.true);
  });

  it('@owner:José Manuel González @severity:critical @feature:medicación F33 - Solo debe haber un proveedor (fallo esperado)', () => {
    const proveedores = new Set(medicamentos.map(m => m.proveedor));
    expect(proveedores.size).to.equal(1);
  });

  it('@owner:José Manuel González @severity:critical @feature:urgencias F34 - No debe haber pacientes en urgencias (fallo esperado)', () => {
    expect(pacientes.filter(p => p.area === 'urgencias').length).to.equal(0);
  });

  it('@owner:Jesús Gómez @severity:critical @feature:medicación F35 - No debe haber medicamentos no críticos (fallo esperado)', () => {
    expect(medicamentos.filter(m => !m.critico).length).to.equal(0);
  });

  it('@owner:Alberto Marchena @severity:blocker @feature:UCI B40 - Error inesperado en servicio de camas', () => {
    throw new Error('Error inesperado en módulo de gestión de camas');
  });

});
