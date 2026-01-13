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
    json: true,   // <-- genera un JSON por cada spec
    reportPageTitle: "Test-Suite",
    html: false   // <-- evita mochawesome.html, aunque el plugin a veces lo ignora
  },

  video: true,  //activa la captura de videos
  videosFolder: "cypress/report/videos",   //ruta de los videos
  screenshotOnRunFailure: true,  //activa las capturas de pantalla
  screenshotsFolder: "cypress/report/screenshots",    //ruta deseada (Cypress la ignorará en CI)

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

        // Copiar en vez de mover para que Jenkins pueda archivar los videos
        if (fs.existsSync(videosDir)) {
          fs.readdirSync(videosDir).forEach(file => {
            const srcPath = path.join(videosDir, file);
            const destPath = path.join(backupVideosDir, `${Date.now()}_${file}`);
            fs.copyFileSync(srcPath, destPath);
          });
        }

        console.log('Videos de esta ejecución guardados automáticamente en videos_backup');

        // ---- BACKUP + MOVER SCREENSHOTS ----
        const realScreenshots = path.join(__dirname, "cypress/screenshots");
        const reportScreenshots = path.join(__dirname, "cypress/report/screenshots");
        const backupScreenshotsDir = path.join(__dirname, 'screenshots_backup');

        if (!fs.existsSync(reportScreenshots)) {
          fs.mkdirSync(reportScreenshots, { recursive: true });
        }
        if (!fs.existsSync(backupScreenshotsDir)) {
          fs.mkdirSync(backupScreenshotsDir, { recursive: true });
        }

        // Cypress SIEMPRE genera screenshots en /cypress/screenshots en CI
        if (fs.existsSync(realScreenshots)) {
          const files = fs.readdirSync(realScreenshots);

          files.forEach(file => {
            const srcPath = path.join(realScreenshots, file);

            // Copia a report/screenshots
            const destReport = path.join(reportScreenshots, `${Date.now()}_${file}`);
            fs.copyFileSync(srcPath, destReport);

            // Copia a screenshots_backup
            const destBackup = path.join(backupScreenshotsDir, `${Date.now()}_${file}`);
            fs.copyFileSync(srcPath, destBackup);
          });

          console.log("📸 Screenshots movidas a cypress/report/screenshots y copiadas a screenshots_backup");
        } else {
          console.log('⚠️ Cypress no generó carpeta /cypress/screenshots');
        }

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
        // === ELIMINAR mochawesome*.html EN TODA LA CARPETA REPORT ===
        // ============================================================
        const deleteUnwantedHtml = (dir) => {
          fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
              deleteUnwantedHtml(fullPath); // Recursivo
            } else if (file.startsWith("mochawesome") && file.endsWith(".html") && file !== "index.html") {
              fs.unlinkSync(fullPath);
              console.log(`🧹 Eliminado HTML no deseado: ${fullPath}`);
            }
          });
        };

        deleteUnwantedHtml(path.join(__dirname, "cypress/report"));

      });

      return config;
    },

    baseUrl: "https://example.cypress.io/", //URL base para las pruebas E2E
  },
});
