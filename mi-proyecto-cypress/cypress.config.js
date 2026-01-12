const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({

  // Reporter principal (Mochawesome puro)
  reporter: "mochawesome",
  reporterOptions: {
    // Guardamos los JSON individuales en .jsons
    reportDir: "cypress/report/.jsons",
    overwrite: false,
    html: false,   // 🔹 Solo JSON aquí
    json: true,
    reportFilename: "mochawesome_[name]" // nombres únicos por spec
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
      // 🔹 Ya no usamos el plugin de cypress-mochawesome-reporter
      // require('cypress-mochawesome-reporter/plugin')(on);

      // Crear carpetas necesarias para Jenkins
      const requiredDirs = [
        path.join(__dirname, 'cypress/report'),
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
      on('after:run', () => {
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

        const screenshotsDir = path.join(__dirname, 'cypress/report/screenshots');
        const backupScreenshotsDir = path.join(__dirname, 'screenshots_backup');

        if (!fs.existsSync(backupScreenshotsDir)) {
          fs.mkdirSync(backupScreenshotsDir, { recursive: true });
        }

        if (fs.existsSync(screenshotsDir)) {
          const files = fs.readdirSync(screenshotsDir);
          files.forEach(file => {
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
