describe("Catálogo - Búsqueda de productos", () => {

  it("T03 - Buscar producto por nombre", () => {

    cy.allure().owner("Carlos");
    cy.allure().feature("Catálogo");
    cy.allure().story("Búsqueda por nombre");
    cy.allure().severity("minor");
    cy.allure().tag("search");
    cy.allure().tag("catalog");

    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    cy.get(".action-email")
      .type("producto123")
      .should("have.value", "producto123");
  });

});
