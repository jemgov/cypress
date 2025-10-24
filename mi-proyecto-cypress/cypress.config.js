const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/report",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    reportPageTitle: "Test-Suite"
  },
  e2e: {
    supportFile: false,
    specPattern: "e2e/1-getting-started/PRUEBAS/*.cy.js",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    baseUrl: "https://example.cypress.io/",
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    video: true,
    videosFolder: "cypress/report/videos"
  }
});
