const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");   // <-- necesario para ejecutar comandos

module.exports = defineConfig({

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
    json: true,   // <-- NUEVO: genera un JSON por cada spec
    reportPageTitle: "Test-Suite",
    html: false   // <-- evita mochawesome.html
  },

  video: true,  //activa la captura de videos
  videosFolder: "cypress/report/videos",   //ruta de los videos
  screenshotOnRunFailure: true,  //activa las capturas de pantalla
  screenshotsFolder: "cypress/report/screenshots",    //ruta de las capturas

  //Aquí añadimos correctamente el bloque "env" Para utilizar la variable: Cypress.env('url')
  env: {
    url: "https://www.google.es/", //variable de entorno personalizada
  },

  e2e: {
    trashAssetsBeforeRuns: false,  // No elimina videos/capturas al iniciar ejecución

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Hook que se ejecuta después de cada run
      on('after:run', (results) => {

        // ---- BACKUP VIDEOS ----
        const videosDir = path.join(__dirname, 'cypress/report/videos');
        const backupVideosDir = path.join(__dirname, 'videos_backup');

        if (!fs.existsSync(backupVideosDir)) {
          fs.mkdirSync(backupVideosDir, { recursive: true });
        }

        // Cambio importante: copiar en vez de mover para que Jenkins pueda archivar los videos
        if (fs.existsSync(videosDir)) {
          fs.readdirSync(videosDir).forEach(file => {
            const srcPath = path.join(videosDir, file);
            const destPath = path.join(backupVideosDir, `${Date.now()}_${file}`);
            fs.copyFileSync(srcPath, destPath); // antes: renameSync
          });
        }

        console.log('Videos de esta ejecución guardados automáticamente en videos_backup');

        // ---- BACKUP SCREENSHOTS ----
        const screenshotsDir = path.join(__dirname, 'cypress/report/screenshots');
        const backupScreenshotsDir = path.join(__dirname, 'screenshots_backup');

        if (!fs.existsSync(backupScreenshotsDir)) {
          fs.mkdirSync(backupScreenshotsDir, { recursive: true });
        }

        if (fs.existsSync(screenshotsDir)) {
          const files = fs.readdirSync(screenshotsDir);
          if (files.length > 0) {
            files.forEach(file => {
              const srcPath = path.join(screenshotsDir, file);
              const destPath = path.join(backupScreenshotsDir, `${Date.now()}_${file}`);
              fs.copyFileSync(srcPath, destPath); // antes: renameSync
            });
            console.log('Screenshots de esta ejecución guardadas automáticamente en screenshots_backup');
          } else {
            console.log('⚠️ No se encontraron screenshots para mover.');
          }
        } else {
          console.log('⚠️ Carpeta de screenshots no existe. No hay capturas que guardar.');
        }

        console.log('Screenshots de esta ejecución guardadas automáticamente en screenshots_backup');

        // ============================================================
        // === GENERAR REPORTE MOCHAWESOME AUTOMÁTICAMENTE ============
        // ============================================================
        try {
          console.log("=== Fusionando JSON de Mochawesome ===");
          execSync(
            `cmd /c "npx mochawesome-merge cypress/report/.jsons/*.json > cypress/report/mochawesome.json"`,
            { stdio: "inherit" }
          );

          console.log("=== Generando HTML de Mochawesome ===");
          execSync(
            `npx marge cypress/report/mochawesome.json --reportDir cypress/report --inline --reportFilename index.html`,
            { stdio: "inherit" }
          );

          console.log("✅ Reporte HTML generado automáticamente en cypress/report/index.html");
        } catch (error) {
          console.error("⚠️ Error generando el reporte Mochawesome:", error);
        }
        // ============================================================

      });

      return config;
    },

    baseUrl: "https://example.cypress.io/", //URL base para las pruebas E2E
  },
});
