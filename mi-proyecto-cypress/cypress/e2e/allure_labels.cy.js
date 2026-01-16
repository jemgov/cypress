describe("Allure - Validación de etiquetas", () => {

  it("T01 - Etiquetas visibles en Behaviors", () => {

    // === ETIQUETAS ALLURE (Shelex) ===
    cy.allure().owner("Jesús");
    cy.allure().feature("Autenticación");
    cy.allure().story("Login con credenciales válidas");
    cy.allure().severity("critical");
    cy.allure().tag("smoke");
    cy.allure().tag("demo");

    // === ACCIÓN SIMPLE PARA GENERAR RESULTADOS ===
    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    cy.get(".action-email")
      .type("test@example.com")
      .should("have.value", "test@example.com");
  });
});