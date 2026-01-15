describe('Sistema Hospitalario - Batería de pruebas con fixtures ampliados', () => {

  // 1 PASSED
  it('Carga correcta de pacientes desde fixture', () => {
    cy.fixture('pacientes').then(pacientes => {
      expect(pacientes.length).to.equal(10);
    });
  });

  // 2 FAILED
  it('Validación incorrecta del área del primer paciente entrante', () => {
    cy.fixture('pacientes').then(pacientes => {
      expect(pacientes[0].area).to.equal('UCI'); // en fixture es "Urgencias"
    });
  });

  // 3 SKIPPED
  it.skip('Prueba omitida de carga de medicamentos', () => {});

  // 4 ERROR INTERNO
  it('Error interno al procesar datos de pacientes', () => {
    cy.fixture('pacientes').then(() => {
      JSON.parse("esto no es JSON");
    });
  });

  // 5 PASSED
  it('Validación correcta del nombre del paciente en UCI', () => {
    cy.fixture('pacientes').then(pacientes => {
      const uci = pacientes.find(p => p.area === 'UCI');
      expect(uci.nombre).to.equal('María López');
    });
  });

  // 6 FAILED
  it('Validación incorrecta del stock de clopidogrel', () => {
    cy.fixture('medicamentos').then(meds => {
      const clopi = meds.find(m => m.nombre === 'Clopidogrel');
      expect(clopi.stock).to.equal(0); // en fixture es 12
    });
  });

  // 7 PASSED
  it('Comprobación de existencias de medicamentos críticos', () => {
    cy.fixture('medicamentos').then(meds => {
      const criticos = meds.filter(m => m.critico === true);
      expect(criticos.length).to.be.greaterThan(0);
    });
  });

  // 8 ERROR INTERNO
  it('Error inesperado al validar medicamentos', () => {
    cy.fixture('medicamentos').then(() => {
      throw new Error('Error interno en módulo de farmacia');
    });
  });

  // 9 PASSED
  it('Validación correcta del área de un paciente', () => {
    cy.fixture('pacientes').then(pacientes => {
      const ana = pacientes.find(p => p.nombre === 'Ana Ruiz');
      expect(ana.area).to.equal('Planta 3');
    });
  });

  // 10 FAILED
  it('Validación incorrecta del paciente asignado a Geriatría', () => {
    cy.fixture('pacientes').then(pacientes => {
      const geriatria = pacientes.find(p => p.area === 'Geriatría');
      expect(geriatria.nombre).to.equal('Juan Pérez'); // en fixture es "Miguel Herrera"
    });
  });

  // 11 PASSED
  it('Comprobación de que existe al menos un medicamento con stock alto', () => {
    cy.fixture('medicamentos').then(meds => {
      const altos = meds.filter(m => m.stock > 40);
      expect(altos.length).to.be.greaterThan(0);
    });
  });

  // 12 FAILED
  it('Validación incorrecta del número total de medicamentos', () => {
    cy.fixture('medicamentos').then(meds => {
      expect(meds.length).to.equal(5); // en fixture son 10
    });
  });

  // 13 SKIPPED
  it.skip('Prueba omitida del módulo de farmacia', () => {});

  // 14 ERROR INTERNO
  it('Excepción al procesar stock de medicamentos', () => {
    cy.fixture('medicamentos').then(() => {
      throw new TypeError('Stock inválido detectado');
    });
  });

  // 15 PASSED
  it('Validación correcta del nombre del medicamento con ID 103', () => {
    cy.fixture('medicamentos').then(meds => {
      const ibuprofeno = meds.find(m => m.id === 103);
      expect(ibuprofeno.nombre).to.equal('Ibuprofeno');
    });
  });

  // 16 FAILED
  it('Validación incorrecta del área de paciente inexistente (Paciente fantasma)', () => {
    cy.fixture('pacientes').then(pacientes => {
      const p = pacientes.find(p => p.nombre === 'Paciente Fantasma');
      expect(p.area).to.equal('UCI'); // p es undefined
    });
  });

  // 17 PASSED
  it('Comprobación de que todos los pacientes tienen área asignada', () => {
    cy.fixture('pacientes').then(pacientes => {
      pacientes.forEach(p => expect(p.area).to.be.a('string'));
    });
  });

  // 18 ERROR INTERNO
  it('Error interno al intentar acceder a propiedad inexistente', () => {
    cy.fixture('pacientes').then(pacientes => {
      const p = pacientes[0];
      p.historial.clinico.id; // p.historial es undefined
    });
  });

  // 19 SKIPPED
  it.skip('Prueba omitida del módulo de pacientes críticos', () => {});

  // 20 FAILED
  it('Validación incorrecta del stock de Amoxicilina', () => {
    cy.fixture('medicamentos').then(meds => {
      const amo = meds.find(m => m.nombre === 'Amoxicilina');
      expect(amo.stock).to.equal(50); // en fixture es 0
    });
  });

  // 21 PASSED
  it('Validación correcta del paciente con ID: 9', () => {
    cy.fixture('pacientes').then(pacientes => {
      expect(pacientes[0].id).to.equal(9);
    });
  });

  // 22 FAILED
  it('Validación incorrecta del número de pacientes en UCI', () => {
    cy.fixture('pacientes').then(pacientes => {
      const uci = pacientes.filter(p => p.area === 'UCI');
      expect(uci.length).to.equal(5); // en fixture es 1
    });
  });

  // 23 ERROR INTERNO
  it('Error inesperado al procesar lista de pacientes', () => {
    cy.fixture('pacientes').then(() => {
      JSON.parse(undefined);
    });
  });

  // 24 PASSED
  it('Validación correcta del medicamento con stock cero', () => {
    cy.fixture('medicamentos').then(meds => {
      const sinStock = meds.find(m => m.stock === 0);
      expect(sinStock.nombre).to.equal('Amoxicilina');
    });
  });

  // 25 SKIPPED
  it.skip('Prueba omitida del módulo de quirófanos', () => {});
});
