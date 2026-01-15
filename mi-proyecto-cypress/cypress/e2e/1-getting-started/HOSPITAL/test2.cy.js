  //
  // PASSED (21–24) — Continúa desde el bloque anterior
  //

  it('HUDR_2.3 - Validación de nombres válidos de medicamentos', {
    severity: 'minor',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    medicamentos.forEach(m => expect(m.nombre).to.be.a('string').and.not.be.empty);
  });

  it('P22 - Validación de medicamentos de PharmaPlus', {
    severity: 'normal',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    const pharma = medicamentos.filter(m => m.proveedor === 'PharmaPlus');
    expect(pharma.length).to.be.greaterThan(0);
  });

  it('P23 - Validación de medicamentos de MediHealth', {
    severity: 'normal',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    const med = medicamentos.filter(m => m.proveedor === 'MediHealth');
    expect(med.length).to.be.greaterThan(0);
  });

  it('P24 - Validación de medicamentos de Hospicare', {
    severity: 'minor',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    const hos = medicamentos.filter(m => m.proveedor === 'Hospicare');
    expect(hos.length).to.be.greaterThan(0);
  });

//
// NUEVO DESCRIBE — Flujos mixtos (PASSED 25–36)
//

describe('Hospital - Flujos mixtos', () => {

  it('P25 - Asignación de medicamento crítico a paciente de UCI', {
    severity: 'critical',
    feature: 'UCI',
    owner: 'Jesús G.'
  }, () => {
    const uci = pacientes.find(p => p.area === 'UCI');
    const critico = medicamentos.find(m => m.critico);
    expect(uci).to.not.be.undefined;
    expect(critico).to.not.be.undefined;
  });

  it('P26 - Asignación de medicamento no crítico a paciente de urgencias', {
    severity: 'normal',
    feature: 'urgencias',
    owner: 'QA Team'
  }, () => {
    const urg = pacientes.find(p => p.area === 'urgencias');
    const noCritico = medicamentos.find(m => !m.critico);
    expect(urg).to.not.be.undefined;
    expect(noCritico).to.not.be.undefined;
  });

  it('P27 - Validación de pacientes en áreas críticas', {
    severity: 'critical',
    feature: 'UCI',
    owner: 'Jesús G.'
  }, () => {
    const criticos = pacientes.filter(p => ['UCI', 'urgencias'].includes(p.area));
    expect(criticos.length).to.be.greaterThan(0);
  });

  it('P28 - Simulación de traslado de paciente a neurología', {
    severity: 'minor',
    feature: 'UCI',
    owner: 'QA Team'
  }, () => {
    const p = pacientes[0];
    const traslado = { ...p, area: 'neurologia' };
    expect(traslado.area).to.equal('neurologia');
  });

  it('P29 - Validación de consistencia de fixtures', {
    severity: 'normal',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    expect(pacientes.length).to.equal(20);
    expect(medicamentos.length).to.equal(20);
  });

  it('P30 - Validación de medicación crítica en varios proveedores', {
    severity: 'critical',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    const proveedores = new Set(
      medicamentos.filter(m => m.critico).map(m => m.proveedor)
    );
    expect(proveedores.size).to.be.greaterThan(1);
  });

  it('P31 - Validación de pacientes con IDs mayores a 50000', {
    severity: 'normal',
    feature: 'urgencias',
    owner: 'Jesús G.'
  }, () => {
    const altos = pacientes.filter(p => p.id > 50000);
    expect(altos.length).to.be.greaterThan(0);
  });

  it('P32 - Validación de medicamentos con IDs terminados en número par', {
    severity: 'minor',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    const pares = medicamentos.filter(m => Number(m.id.slice(-1)) % 2 === 0);
    expect(pares.length).to.be.greaterThan(0);
  });

  it('P33 - Validación de medicamentos con IDs terminados en número impar', {
    severity: 'minor',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    const impares = medicamentos.filter(m => Number(m.id.slice(-1)) % 2 === 1);
    expect(impares.length).to.be.greaterThan(0);
  });

  it('P34 - Validación de pacientes cuyo nombre empieza por vocal', {
    severity: 'normal',
    feature: 'urgencias',
    owner: 'QA Team'
  }, () => {
    const vocales = pacientes.filter(p => /^[AEIOU]/i.test(p.nombre));
    expect(vocales.length).to.be.greaterThan(0);
  });

  it('P35 - Validación de medicamentos cuyo nombre contiene la letra A', {
    severity: 'minor',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    const conA = medicamentos.filter(m => /a/i.test(m.nombre));
    expect(conA.length).to.be.greaterThan(0);
  });

  it('P36 - Validación de pacientes en más de 6 áreas distintas', {
    severity: 'normal',
    feature: 'UCI',
    owner: 'QA Team'
  }, () => {
    const areas = new Set(pacientes.map(p => p.area));
    expect(areas.size).to.be.greaterThan(6);
  });
});
