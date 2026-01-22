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
    html: false,          // ❗ Evita que cree report/report
    saveHtml: false       // ❗ Evita HTML duplicado
  },

  // === CONFIGURACIÓN DE VIDEOS Y SCREENSHOTS ===
  video: true,
  videosFolder: "cypress/report/videos",        // 🔥 Ahora dentro de /report
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/report/screenshots",

  // === ENV (ACTIVAR ALLURE) ===
  env: {
    url: "https://www.google.es/",
    allure: true
  },

  // === RETRIES ===
  retries: {
    runMode: 2,
    openMode: 1
  },

  e2e: {
    trashAssetsBeforeRuns: false,

    setupNodeEvents(on, config) {

      // === ACTIVAR ALLURE ===
      console.log("🔥 Allure plugin cargado");
      allureWriter(on, config);

      // === ACTIVAR MOCHAWESOME ===
      require('cypress-mochawesome-reporter/plugin')(on);

      // ============================================================
      //  AFTER:SPEC → BACKUPS + GENERAR JUNIT PARA JENKINS
      // ============================================================
      on('after:spec', (spec, results) => {

        const specName = path.basename(spec.relative, '.cy.js');

        // === BACKUP VIDEOS ===
        const videosDir = path.join(__dirname, 'cypress/report/videos');
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
        const realScreenshots = path.join(__dirname, "cypress/report/screenshots");
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

        // ============================================================
        //  GENERAR JUNIT PARA JENKINS (ESTADÍSTICAS)
        // ============================================================
        const junitDir = path.join(__dirname, 'cypress/results');
        fs.mkdirSync(junitDir, { recursive: true });

        const junitFile = path.join(junitDir, `${specName}.xml`);

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<testsuite name="${specName}" tests="${results.tests.length}">\n`;

        results.tests.forEach(test => {
          const testName = test.title.join(' ');
          xml += `  <testcase name="${testName}">\n`;

          if (test.state === 'failed') {
            xml += `    <failure message="${test.displayError || 'Error'}"></failure>\n`;
          }

          xml += `  </testcase>\n`;
        });

        xml += `</testsuite>\n`;

        fs.writeFileSync(junitFile, xml, 'utf-8');
      });

      // ============================================================
      //  AFTER:RUN → MERGE MOCHAWESOME + GENERAR HTML
      // ============================================================
      on('after:run', () => {

        const jsonsDir = path.join(__dirname, "cypress/report/.jsons");
        const reportDir = path.join(__dirname, "cypress/report");

        // === MOVER JSONS DESDE .jsons A /report ===
        if (fs.existsSync(jsonsDir)) {
          fs.readdirSync(jsonsDir).forEach(file => {
            if (file.endsWith(".json")) {
              fs.renameSync(
                path.join(jsonsDir, file),
                path.join(reportDir, file)
              );
            }
          });
        }

        // === MERGE ===
        try {
          execSync(
            `cmd /c "npx mochawesome-merge cypress/report/*.json > cypress/report/mochawesome.json"`,
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

        deleteUnwantedHtml(reportDir);
      });

      return config;
    },

    baseUrl: "https://example.cypress.io/",
  },
});