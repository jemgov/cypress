/// <reference types="cypress" />

describe('HUDR_2.3 - Validaciones generales de datos', () => {
  let pacientes;
  let medicamentos;

  before(() => {
    cy.fixture('pacientes').then(data => pacientes = data);
    cy.fixture('medicamentos').then(data => medicamentos = data);
  });

  //
  // PASSED (1–12)
  //

  it('P01 - Comprobación de que existen pacientes en al menos 5 áreas distintas', {
    severity: 'normal',
    feature: 'urgencias',
    owner: 'Jesús G.'
  }, () => {
    const areas = new Set(pacientes.map(p => p.area));
    expect(areas.size).to.be.greaterThan(4);
  });

  it('P02 - Validación de estructura mínima de paciente', {
    severity: 'minor',
    feature: 'urgencias',
    owner: 'QA Team'
  }, () => {
    const p = pacientes[2];
    expect(p).to.have.property('nombre');
    expect(p).to.have.property('apellido1');
    expect(p).to.have.property('apellido2');
  });

  it('P03 - Comprobación de IDs no correlativos', {
    severity: 'normal',
    feature: 'UCI',
    owner: 'Jesús G.'
  }, () => {
    const ids = pacientes.map(p => p.id);
    const sorted = [...ids].sort((a, b) => a - b);
    expect(JSON.stringify(ids)).to.not.equal(JSON.stringify(sorted));
  });

  it('P04 - Validación de pacientes en UCI', {
    severity: 'critical',
    feature: 'UCI',
    owner: 'QA Team'
  }, () => {
    const uci = pacientes.filter(p => p.area === 'UCI');
    expect(uci.length).to.be.greaterThan(0);
  });

  it('P05 - Validación de pacientes en urgencias', {
    severity: 'normal',
    feature: 'urgencias',
    owner: 'Jesús G.'
  }, () => {
    const urg = pacientes.filter(p => p.area === 'urgencias');
    expect(urg.length).to.be.greaterThan(0);
  });

  it('P06 - Validación de pacientes pediátricos', {
    severity: 'minor',
    feature: 'urgencias',
    owner: 'QA Team'
  }, () => {
    const pedi = pacientes.filter(p => p.area === 'pediatria');
    expect(pedi.length).to.be.greaterThan(0);
  });

  it('P07 - Validación de que todos los pacientes tienen ID numérico', {
    severity: 'normal',
    feature: 'UCI',
    owner: 'Jesús G.'
  }, () => {
    pacientes.forEach(p => expect(p.id).to.be.a('number'));
  });

  it('P08 - Validación de que no existen pacientes sin apellidos', {
    severity: 'minor',
    feature: 'urgencias',
    owner: 'QA Team'
  }, () => {
    pacientes.forEach(p => {
      expect(p.apellido1).to.be.a('string').and.not.be.empty;
      expect(p.apellido2).to.be.a('string').and.not.be.empty;
    });
  });

  it('P09 - Validación de pacientes en neurología', {
    severity: 'normal',
    feature: 'UCI',
    owner: 'Jesús G.'
  }, () => {
    const neu = pacientes.filter(p => p.area === 'neurologia');
    expect(neu.length).to.be.greaterThan(0);
  });

  it('P10 - Validación de pacientes en oncología', {
    severity: 'normal',
    feature: 'urgencias',
    owner: 'QA Team'
  }, () => {
    const onc = pacientes.filter(p => p.area === 'oncologia');
    expect(onc.length).to.be.greaterThan(0);
  });

  it('P11 - Validación de pacientes en traumatología', {
    severity: 'minor',
    feature: 'UCI',
    owner: 'Jesús G.'
  }, () => {
    const trauma = pacientes.filter(p => p.area === 'traumatologia');
    expect(trauma.length).to.be.greaterThan(0);
  });

  it('P12 - Validación de pacientes en rehabilitación', {
    severity: 'normal',
    feature: 'urgencias',
    owner: 'QA Team'
  }, () => {
    const rehab = pacientes.filter(p => p.area === 'rehabilitacion');
    expect(rehab.length).to.be.greaterThan(0);
  });
});

describe('Hospital - Medicación y proveedores', () => {
  //
  // PASSED (13–20)
  //

  it('P13 - Validación de estructura de medicamento', {
    severity: 'normal',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    const m = medicamentos[0];
    expect(m).to.have.keys(['id', 'nombre', 'critico', 'proveedor']);
  });

  it('P14 - Validación de formato de ID de medicamento', {
    severity: 'minor',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    medicamentos.forEach(m => {
      expect(m.id).to.match(/^[A-Z]{3}\d{3}$/);
    });
  });

  it('P15 - Validación de medicamentos críticos', {
    severity: 'critical',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    const criticos = medicamentos.filter(m => m.critico);
    expect(criticos.length).to.equal(12);
  });

  it('P16 - Validación de medicamentos no críticos', {
    severity: 'normal',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    const noCriticos = medicamentos.filter(m => !m.critico);
    expect(noCriticos.length).to.equal(8);
  });

  it('P17 - Validación de proveedores disponibles', {
    severity: 'normal',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    const proveedores = new Set(medicamentos.map(m => m.proveedor));
    expect(proveedores.size).to.equal(4);
  });

  it('P18 - Validación de IDs únicos', {
    severity: 'minor',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    const ids = medicamentos.map(m => m.id);
    const set = new Set(ids);
    expect(set.size).to.equal(ids.length);
  });

  it('P19 - Validación de que existe al menos un medicamento crítico por proveedor', {
    severity: 'critical',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    const proveedores = ['PharmaPlus', 'MediHealth', 'Hospicare', 'SaludGlobal'];
    proveedores.forEach(p => {
      const criticos = medicamentos.filter(m => m.proveedor === p && m.critico);
      expect(criticos.length).to.be.greaterThan(0);
    });
  });

  it('P20 - Validación de que existe medicación no crítica en varios proveedores', {
    severity: 'normal',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    const proveedores = new Set(
      medicamentos.filter(m => !m.critico).map(m => m.proveedor)
    );
    expect(proveedores.size).to.be.greaterThan(1);
  });
});
