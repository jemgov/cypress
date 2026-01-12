const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({

  // Reporter limpio y moderno
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/report",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    saveHtml: true, // 🔥 CLAVE: genera HTML automáticamente
    reportPageTitle: "Test-Suite"
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
      require('cypress-mochawesome-reporter/plugin')(on);

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

      // Generar XML JUnit
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

      return config;
    },

    baseUrl: "https://example.cypress.io/",
  },
});
