/// <reference types="cypress" />

describe('HUDR_2.3 – Medicamentos', () => {

  let medicamentos;

  before(() => {
    cy.fixture('medicamentos').then(data => medicamentos = data);
  });

  it('P06 - Medicamentos con ID válido', () => {
    medicamentos.forEach(m => expect(m.id).to.match(/^[A-Z]{3}\d{3}$/));
  });

  it('P10 - Proveedores disponibles', () => {
    const proveedores = new Set(medicamentos.map(m => m.proveedor));
    expect(proveedores.size).to.equal(4);
  });

  it('P11 - IDs únicos de medicamentos', () => {
    const ids = medicamentos.map(m => m.id);
    expect(new Set(ids).size).to.equal(ids.length);
  });

  it('P12 - Medicamentos de PharmaPlus', () => {
    expect(medicamentos.filter(m => m.proveedor === 'PharmaPlus').length).to.be.greaterThan(0);
  });

  it('P13 - Medicamentos de MediHealth', () => {
    expect(medicamentos.filter(m => m.proveedor === 'MediHealth').length).to.be.greaterThan(0);
  });

  it('P14 - Medicamentos de Hospicecare', () => {
    expect(medicamentos.filter(m => m.proveedor === 'Hospicare').length).to.be.greaterThan(0);
  });

  it('P21 - Medicamentos críticos por proveedor', () => {
    ['PharmaPlus', 'MediHealth', 'Hospicare', 'SaludGlobal'].forEach(p => {
      expect(medicamentos.filter(m => m.proveedor === p && m.critico).length).to.be.greaterThan(0);
    });
  });

  it('P23 - Medicamentos con estructura válida', () => {
    const m = medicamentos[0];
    expect(m).to.have.keys(['id', 'nombre', 'critico', 'proveedor']);
  });

  it('P27 - Medicamentos no críticos por proveedor', () => {
    const proveedores = new Set(
      medicamentos.filter(m => !m.critico).map(m => m.proveedor)
    );
    expect(proveedores.size).to.be.greaterThan(1);
  });

});
