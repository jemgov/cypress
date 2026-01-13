const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");

module.exports = defineConfig({

  // === REPORTER PRINCIPAL (Mochawesome) ===
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/report",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    json: true,
    reportPageTitle: "Test-Suite",
    html: false
  },

  // === CONFIGURACIÓN DE VIDEOS Y SCREENSHOTS ===
  video: true,
  videosFolder: "cypress/report/videos",
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/report/screenshots",

  env: {
    url: "https://www.google.es/",
  },

  e2e: {
    trashAssetsBeforeRuns: false,

    setupNodeEvents(on, config) {

      // === ACTIVAR MOCHAWESOME ===
      require('cypress-mochawesome-reporter/plugin')(on);

      // === ACTIVAR ALLURE ===
      require('@shelex/cypress-allure-plugin/writer')(on, config);

      // === POST-EJECUCIÓN (BACKUPS + MOCHAWESOME) ===
      on('after:run', () => {

        // ---- BACKUP VIDEOS ----
        const videosDir = path.join(__dirname, 'cypress/report/videos');
        const backupVideosDir = path.join(__dirname, 'videos_backup');

        if (!fs.existsSync(backupVideosDir)) {
          fs.mkdirSync(backupVideosDir, { recursive: true });
        }

        if (fs.existsSync(videosDir)) {
          fs.readdirSync(videosDir).forEach(file => {
            const srcPath = path.join(videosDir, file);
            const destPath = path.join(backupVideosDir, `${Date.now()}_${file}`);
            fs.copyFileSync(srcPath, destPath);
          });
        }

        // ---- BACKUP + COPIA SCREENSHOTS ----
        const realScreenshots = path.join(__dirname, "cypress/screenshots");
        const reportScreenshots = path.join(__dirname, "cypress/report/screenshots");
        const backupScreenshotsDir = path.join(__dirname, 'screenshots_backup');

        if (!fs.existsSync(reportScreenshots)) {
          fs.mkdirSync(reportScreenshots, { recursive: true });
        }
        if (!fs.existsSync(backupScreenshotsDir)) {
          fs.mkdirSync(backupScreenshotsDir, { recursive: true });
        }

        if (fs.existsSync(realScreenshots)) {
          fs.readdirSync(realScreenshots).forEach(file => {
            const srcPath = path.join(realScreenshots, file);

            const destReport = path.join(reportScreenshots, `${Date.now()}_${file}`);
            fs.copyFileSync(srcPath, destReport);

            const destBackup = path.join(backupScreenshotsDir, `${Date.now()}_${file}`);
            fs.copyFileSync(srcPath, destBackup);
          });
        }

        // === GENERAR REPORTE MOCHAWESOME ===
        try {
          execSync(
            `cmd /c "npx mochawesome-merge cypress/report/.jsons/*.json > cypress/report/mochawesome.json"`,
            { stdio: "inherit" }
          );

          execSync(
            `npx marge cypress/report/mochawesome.json --reportDir cypress/report --inline --reportFilename index.html`,
            { stdio: "inherit" }
          );

        } catch (error) {
          console.error("⚠️ Error generando Mochawesome:", error);
        }

        // === ELIMINAR HTMLS NO DESEADOS ===
        const deleteUnwantedHtml = (dir) => {
          fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
              deleteUnwantedHtml(fullPath);
            } else if (file.startsWith("mochawesome") && file.endsWith(".html") && file !== "index.html") {
              fs.unlinkSync(fullPath);
            }
          });
        };

        deleteUnwantedHtml(path.join(__dirname, "cypress/report"));
      });

      return config;
    },

    baseUrl: "https://example.cypress.io/",
  },
});
