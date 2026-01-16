describe("Registro - Validación de formulario", () => {

  it("T02 - Registro con datos válidos", () => {

    cy.allure().owner("Laura");
    cy.allure().feature("Registro");
    cy.allure().story("Formulario completo");
    cy.allure().severity("normal");
    cy.allure().tag("regression");
    cy.allure().tag("form");

    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    cy.get(".action-email")
      .type("nuevo@usuario.com")
      .should("have.value", "nuevo@usuario.com");
  });

});
