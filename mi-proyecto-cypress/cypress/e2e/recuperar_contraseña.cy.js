describe("Seguridad - Recuperación de contraseña", () => {

  it("T04 - Enviar solicitud de recuperación", () => {

    cy.allure().owner("Jesús");
    cy.allure().feature("Seguridad");
    cy.allure().story("Recuperación de contraseña");
    cy.allure().severity("blocker");
    cy.allure().tag("security");
    cy.allure().tag("critical-path");

    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    cy.get(".action-email")
      .type("usuario@seguro.com")
      .should("have.value", "usuario@seguro.com");
  });

});
