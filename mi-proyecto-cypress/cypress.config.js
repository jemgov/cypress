const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

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
  videosFolder: "cypress/videos",
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",

  // === ENV (ACTIVAR ALLURE) ===
  env: {
    url: "https://www.google.es/",
    allure: true
  },

  // === ACTIVAR RETRIES PARA ALLURE ===
  retries: {
    runMode: 2,
    openMode: 0
  },

  e2e: {
    trashAssetsBeforeRuns: false,

    setupNodeEvents(on, config) {

      // === ACTIVAR ALLURE ===
      console.log("🔥 Allure plugin cargado");
      allureWriter(on, config);

      // === ACTIVAR MOCHAWESOME ===
      require('cypress-mochawesome-reporter/plugin')(on);

      // === BACKUPS SEGUROS (AFTER:SPEC) ===
      on('after:spec', (spec, results) => {

        const specName = path.basename(spec.relative, '.cy.js');

        // === BACKUP VIDEOS ===
        const videosDir = path.join(__dirname, 'cypress/videos');
        const backupVideosDir = path.join(__dirname, 'videos_backup', specName);

        fs.mkdirSync(backupVideosDir, { recursive: true });

        if (fs.existsSync(videosDir)) {
          fs.readdirSync(videosDir).forEach(file => {
            const srcPath = path.join(videosDir, file);

            if (file.endsWith('-compressed.mp4')) {
              try { fs.unlinkSync(srcPath); } catch {}
              return;
            }

            if (!file.startsWith(specName)) return;

            const destPath = path.join(backupVideosDir, file);
            try {
              fs.copyFileSync(srcPath, destPath);
            } catch (err) {
              console.error("⚠️ Error copiando video:", err.message);
            }
          });
        }

        // === BACKUP SCREENSHOTS ===
        const realScreenshots = path.join(__dirname, "cypress/screenshots");
        const backupScreenshotsDir = path.join(__dirname, 'screenshots_backup', specName);

        fs.mkdirSync(backupScreenshotsDir, { recursive: true });

        const copyScreenshotsRecursively = (dir) => {
          fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
              copyScreenshotsRecursively(fullPath);
            } else if (file.endsWith(".png")) {
              const destBackup = path.join(backupScreenshotsDir, `${Date.now()}_${file}`);
              try {
                fs.copyFileSync(fullPath, destBackup);
              } catch (err) {
                console.error("⚠️ Error copiando screenshot:", err.message);
              }
            }
          });
        };

        if (fs.existsSync(realScreenshots)) {
          copyScreenshotsRecursively(realScreenshots);
        }
      });

      // === GENERAR SOLO MOCHAWESOME (AFTER:RUN) ===
      on('after:run', () => {
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
          console.error("⚠️ Error generando reportes:", error);
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
