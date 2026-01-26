/// <reference types="cypress" />

describe('HUDR_2.3 - Suite completa de validaciones hospitalarias', () => {

  let pacientes;
  let medicamentos;

  before(() => {
    cy.fixture('pacientes').then(data => pacientes = data);
    cy.fixture('medicamentos').then(data => medicamentos = data);
  });

  // ======================================================
  //  PASSED (28)
  // ======================================================

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

  it('P06 - Medicamentos con ID válido', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('minor');
    cy.allure().feature('medicación');

    medicamentos.forEach(m => expect(m.id).to.match(/^[A-Z]{3}\d{3}$/));
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

  it('P10 - Proveedores disponibles', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('normal');
    cy.allure().feature('medicación');

    const proveedores = new Set(medicamentos.map(m => m.proveedor));
    expect(proveedores.size).to.equal(4);
  });

  it('P11 - IDs únicos de medicamentos', () => {
    cy.allure().owner('Alberto Marchena');
    cy.allure().severity('minor');
    cy.allure().feature('medicación');

    const ids = medicamentos.map(m => m.id);
    expect(new Set(ids).size).to.equal(ids.length);
  });

  it('P12 - Medicamentos de PharmaPlus', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('normal');
    cy.allure().feature('medicación');

    expect(medicamentos.filter(m => m.proveedor === 'PharmaPlus').length).to.be.greaterThan(0);
  });

  it('P13 - Medicamentos de MediHealth', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('normal');
    cy.allure().feature('medicación');

    expect(medicamentos.filter(m => m.proveedor === 'MediHealth').length).to.be.greaterThan(0);
  });

  it('P14 - Medicamentos de Hospicecare', () => {
    cy.allure().owner('Carlos Sánchez');
    cy.allure().severity('minor');
    cy.allure().feature('medicación');

    expect(medicamentos.filter(m => m.proveedor === 'Hospicare').length).to.be.greaterThan(0);
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

  it('P21 - Medicamentos críticos por proveedor', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('critical');
    cy.allure().feature('medicación');

    ['PharmaPlus', 'MediHealth', 'Hospicare', 'SaludGlobal'].forEach(p => {
      expect(medicamentos.filter(m => m.proveedor === p && m.critico).length).to.be.greaterThan(0);
    });
  });

  it('P22 - Pacientes con nombre que empieza por vocal', () => {
    cy.allure().owner('Marta Rodríguez');
    cy.allure().severity('minor');
    cy.allure().feature('urgencias');

    expect(pacientes.filter(p => /^[AEIOU]/i.test(p.nombre)).length).to.be.greaterThan(0);
  });

  it('P23 - Medicamentos con estructura válida', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('normal');
    cy.allure().feature('medicación');

    const m = medicamentos[0];
    expect(m).to.have.keys(['id', 'nombre', 'critico', 'proveedor']);
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

  it('P27 - Medicamentos no críticos por proveedor', () => {
    cy.allure().owner('Alberto Marchena');
    cy.allure().severity('normal');
    cy.allure().feature('medicación');

    const proveedores = new Set(
      medicamentos.filter(m => !m.critico).map(m => m.proveedor)
    );
    expect(proveedores.size).to.be.greaterThan(1);
  });

  it('P28 - Consistencia de fixtures', () => {
    cy.allure().owner('Marta Rodríguez');
    cy.allure().severity('normal');
    cy.allure().feature('hospital');

    expect(pacientes.length).to.equal(20);
    expect(medicamentos.length).to.equal(20);
  });

  // ======================================================
  //  FAILED (7)
  // ======================================================

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

  // ======================================================
  //  SKIPPED (4)
  // ======================================================

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

  // ======================================================
  //  BROKEN (1)
  // ======================================================

  it('B40 - Error inesperado en servicio de camas', () => {
    cy.allure().owner('Alberto Marchena');
    cy.allure().severity('blocker');
    cy.allure().feature('UCI');

    throw new Error('Error inesperado en módulo de gestión de camas');
  });

  // ======================================================
  //  FLAKY (3)
  // ======================================================

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