const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({

  // Reporter principal (Mochawesome)
  // 🔥 Ahora usando cypress-mochawesome-reporter para evitar duplicados y generar HTML limpio
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/report",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    saveHtml: true, // 🔥 Genera HTML automáticamente sin merge
    reportPageTitle: "Test-Suite",
  },

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

      // Plugin oficial del reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // Crear carpetas necesarias para Jenkins
      const requiredDirs = [
        path.join(__dirname, 'cypress/report'),              // ← Carpeta base añadida
        path.join(__dirname, 'cypress/report/videos'),
        path.join(__dirname, 'cypress/report/screenshots'),
        path.join(__dirname, 'cypress/results')
      ];

      requiredDirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });

      // 🔧 Generar XML JUnit sin bloquear Cypress
      on('after:spec', (spec, results) => {
        if (!results || !results.tests || results.tests.length === 0) return;

        const junitOutputDir = path.join(__dirname, 'cypress/results');
        if (!fs.existsSync(junitOutputDir)) {
          fs.mkdirSync(junitOutputDir, { recursive: true });
        }

        const xmlFile = path.join(junitOutputDir, `${spec.name}.xml`);

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<testsuite name="${spec.name}" tests="${results.tests.length}">\n`;

        results.tests.forEach(test => {
          const testName = test.title.join(' ');
          const status = test.state === 'failed' ? 'failed' : 'passed';

          xml += `  <testcase name="${testName}">\n`;

          if (status === 'failed') {
            xml += `    <failure message="${test.displayError || 'Error'}"></failure>\n`;
          }

          xml += `  </testcase>\n`;
        });

        xml += `</testsuite>\n`;

        fs.writeFileSync(xmlFile, xml, 'utf-8');
      });

      // Backups de vídeos y screenshots
      // 🔥 Ahora se ejecuta DESPUÉS de que el HTML esté generado
      on('after:run', () => {

        const htmlReport = path.join(__dirname, 'cypress/report/mochawesome.html');

        // Si el HTML aún no existe, no movemos nada
        if (!fs.existsSync(htmlReport)) {
          console.log("HTML aún no generado, no se moverán vídeos ni screenshots.");
          return;
        }

        // === BACKUP DE VIDEOS ===
        const videosDir = path.join(__dirname, 'cypress/report/videos');
        const backupVideosDir = path.join(__dirname, 'videos_backup');

        if (!fs.existsSync(backupVideosDir)) {
          fs.mkdirSync(backupVideosDir, { recursive: true });
        }

        if (fs.existsSync(videosDir)) {
          fs.readdirSync(videosDir).forEach(file => {
            const srcPath = path.join(videosDir, file);
            const destPath = path.join(backupVideosDir, `${Date.now()}_${file}`);
            fs.renameSync(srcPath, destPath);
          });
        }

        // === BACKUP DE SCREENSHOTS ===
        const screenshotsDir = path.join(__dirname, 'cypress/report/screenshots');
        const backupScreenshotsDir = path.join(__dirname, 'screenshots_backup');

        if (!fs.existsSync(backupScreenshotsDir)) {
          fs.mkdirSync(backupScreenshotsDir, { recursive: true });
        }

        if (fs.existsSync(screenshotsDir)) {
          fs.readdirSync(screenshotsDir).forEach(file => {
            const srcPath = path.join(screenshotsDir, file);
            const destPath = path.join(backupScreenshotsDir, `${Date.now()}_${file}`);
            fs.renameSync(srcPath, destPath);
          });
        }
      });

      return config;
    },

    baseUrl: "https://example.cypress.io/",
  },
});
