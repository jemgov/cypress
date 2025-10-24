const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Desactiva support file
    supportFile: false,
    specPattern: "e2e/1-getting-started/PRUEBAS/*.cy.js", // <- esto es clave
    // Configuración de eventos de Node
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implementa aquí otros listeners si quieres
      return config; // siempre devuelve config al final
    },

    // Reportes con Mochawesome
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/report",
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveJson: true,
      reportPageTitle: "Test-Suite",
    },

    // Otras configuraciones
    baseUrl: "https://example.cypress.io/",
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    video: true,
    videosFolder: "cypress/video",
    //videoCompression: true,
    //trashAssetsBeforeRuns: true
  },
});