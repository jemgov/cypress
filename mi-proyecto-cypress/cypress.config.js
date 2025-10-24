const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
	  supportFile: false,           // Desactiva support file
      // implement node event listeners here
    }
    },

    //reportes con mocha
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      //carpeta donde se guardarán los reportes
      reportDir: "cypress/report",
      //algunas opciones visuales
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveJson: true,
      reportPageTitle: "Test-Suite",

    },
    
    baseUrl:"https://example.cypress.io/",
    screenshotOnRunFailure: true,  //activa las capturas de pantalla
    screenshotsFolder: "cypress/screenshots",    //ruta de las capturas
    video: true,  //activa la captura de videos
    videosFolder: "cypress/video",   //ruta de los videos
    //videoCompression: true, //activa la comprensión de video
    //trashAssetsBeforeRuns: true   //elimina los videos de las pruebas exitosas para ahorrar espacio en disco
  },
});
