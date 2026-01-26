/// <reference types="cypress" />

describe('HUDR_2.3 – Medicamentos', () => {

  let medicamentos;

  before(() => {
    cy.fixture('medicamentos').then(data => medicamentos = data);
  });

  it('P06 - Medicamentos con ID válido', () => {
    cy.allure().owner('Jesús Gómez');
    cy.allure().severity('minor');
    cy.allure().feature('medicación');

    medicamentos.forEach(m => expect(m.id).to.match(/^[A-Z]{3}\d{3}$/));
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

  it('P21 - Medicamentos críticos por proveedor', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('critical');
    cy.allure().feature('medicación');

    ['PharmaPlus', 'MediHealth', 'Hospicare', 'SaludGlobal'].forEach(p => {
      expect(medicamentos.filter(m => m.proveedor === p && m.critico).length).to.be.greaterThan(0);
    });
  });

  it('P23 - Medicamentos con estructura válida', () => {
    cy.allure().owner('José Manuel González');
    cy.allure().severity('normal');
    cy.allure().feature('medicación');

    const m = medicamentos[0];
    expect(m).to.have.keys(['id', 'nombre', 'critico', 'proveedor']);
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

});
