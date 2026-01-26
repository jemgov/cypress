/// <reference types="cypress" />

describe('HUDR_2.3 – Tests aleatorios', () => {

  it('FL01 - Validación aleatoria de paciente crítico', () => {
    const r = Math.random();
    expect(r).to.be.greaterThan(0.3);
  });

  it('FL02 - Validación aleatoria de proveedor activo', () => {
    const r = Math.random();
    expect(r).to.be.lessThan(0.8);
  });

  it('FL03 - Validación aleatoria de nombre de paciente', () => {
    const r = Math.random();
    expect(r).to.be.greaterThan(0.5);
  });

});
