//
// FAILED (37–48)
//

describe('HUDR_2.3 - Tests fallidos', () => {

  it('F01 - Falla al validar paciente inexistente', {
    severity: 'critical',
    feature: 'urgencias',
    owner: 'Jesús G.'
  }, () => {
    const p = pacientes.find(p => p.id === 11111);
    expect(p).to.not.be.undefined; // Forzado a fallar
  });

  it('F02 - Falla al validar área inexistente', {
    severity: 'critical',
    feature: 'UCI',
    owner: 'QA Team'
  }, () => {
    const p = pacientes.find(p => p.area === 'cardiologia');
    expect(p).to.not.be.undefined; // Forzado a fallar
  });

  it('F03 - Falla al validar número incorrecto de pacientes', {
    severity: 'critical',
    feature: 'urgencias',
    owner: 'Jesús G.'
  }, () => {
    expect(pacientes.length).to.equal(10); // Forzado a fallar
  });

  it('F04 - Falla al validar que todos los medicamentos son críticos', {
    severity: 'critical',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    medicamentos.forEach(m => expect(m.critico).to.be.true); // Forzado a fallar
  });

  it('F05 - Falla al validar proveedor único', {
    severity: 'critical',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    const proveedores = new Set(medicamentos.map(m => m.proveedor));
    expect(proveedores.size).to.equal(1); // Forzado a fallar
  });

  it('F06 - Falla al validar que no hay pacientes en urgencias', {
    severity: 'critical',
    feature: 'urgencias',
    owner: 'QA Team'
  }, () => {
    const urg = pacientes.filter(p => p.area === 'urgencias');
    expect(urg.length).to.equal(0); // Forzado a fallar
  });

  it('F07 - Falla al validar que no hay medicamentos no críticos', {
    severity: 'critical',
    feature: 'medicación',
    owner: 'Jesús G.'
  }, () => {
    const noCriticos = medicamentos.filter(m => !m.critico);
    expect(noCriticos.length).to.equal(0); // Forzado a fallar
  });

  it('F08 - Falla al validar que todos los pacientes están en UCI', {
    severity: 'critical',
    feature: 'UCI',
    owner: 'QA Team'
  }, () => {
    const noUci = pacientes.filter(p => p.area !== 'UCI');
    expect(noUci.length).to.equal(0); // Forzado a fallar
  });

  it('F09 - Falla al validar IDs correlativos', {
    severity: 'critical',
    feature: 'urgencias',
    owner: 'Jesús G.'
  }, () => {
    const ids = pacientes.map(p => p.id).sort((a, b) => a - b);
    const esperado = Array.from({ length: ids.length }, (_, i) => i + 1);
    expect(ids).to.deep.equal(esperado); // Forzado a fallar
  });

  it('F10 - Falla al validar proveedor único', {
    severity: 'critical',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    const proveedores = new Set(medicamentos.map(m => m.proveedor));
    expect(proveedores.size).to.equal(1); // Forzado a fallar
  });

  it('F11 - Falla al validar que no hay pacientes pediátricos', {
    severity: 'critical',
    feature: 'urgencias',
    owner: 'Jesús G.'
  }, () => {
    const pedi = pacientes.filter(p => p.area === 'pediatria');
    expect(pedi.length).to.equal(0); // Forzado a fallar
  });

  it('F12 - Falla al validar que todos los medicamentos son del mismo proveedor', {
    severity: 'critical',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    const proveedores = new Set(medicamentos.map(m => m.proveedor));
    expect(proveedores.size).to.equal(1); // Forzado a fallar
  });

});
