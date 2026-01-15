//
// BROKEN (56–58)
//

describe('HUDR_2.3 - Tests broken', () => {

  it('B01 - Error en servicio de pacientes (HTTP 503)', {
    severity: 'blocker',
    feature: 'urgencias',
    owner: 'Jesús G.'
  }, () => {
    throw new Error('Servicio de pacientes no disponible (503)');
  });

  it('B02 - Error en servicio de medicación (timeout)', {
    severity: 'blocker',
    feature: 'medicación',
    owner: 'QA Team'
  }, () => {
    throw new Error('Timeout al consultar servicio de medicación');
  });

  it('B03 - Error inesperado en sistema de camas', {
    severity: 'blocker',
    feature: 'UCI',
    owner: 'Jesús G.'
  }, () => {
    throw new Error('Error inesperado en módulo de gestión de camas');
  });

});
