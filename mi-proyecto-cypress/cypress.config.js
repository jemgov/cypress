const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const mocha = require('mocha');
const MochaJUnitReporter = require('mocha-junit-reporter');

module.exports = defineConfig({

  // Reporter principal (Mochawesome)
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/report",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
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
      require('cypress-mochawesome-reporter/plugin')(on);

      // 🔧 Crear carpetas necesarias si no existen (para Jenkins)
      const requiredDirs = [
        path.join(__dirname, 'cypress/report/videos'),
        path.join(__dirname, 'cypress/report/screenshots'),
        path.join(__dirname, 'results')
      ];

      requiredDirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });

      // Generar reporte JUnit adicional (versión corregida)
      on('after:spec', (spec, results) => {
        if (!results || !results.tests || results.tests.length === 0) return;

        const junitOutputDir = path.join(__dirname, 'results');
        if (!fs.existsSync(junitOutputDir)) {
          fs.mkdirSync(junitOutputDir, { recursive: true });
        }

        const mochaRunner = new mocha({
          reporter: MochaJUnitReporter,
          reporterOptions: {
            mochaFile: path.join(junitOutputDir, `${spec.name}.xml`)
          }
        });

        const mochaSuite = mochaRunner.suite;

        // Crear una suite por spec
        const suite = mochaSuite.addSuite(new mocha.Suite(spec.name));

        // Añadir cada test ejecutado
        results.tests.forEach(test => {
          const mTest = new mocha.Test(test.title.join(' '));
          suite.addTest(mTest);

          if (test.state === 'failed') {
            mTest.state = 'failed';
            mTest.err = { message: test.displayError };
          } else {
            mTest.state = 'passed';
          }
        });

        mochaRunner.run();
      });

      // Tu lógica de backup permanece intacta
      on('after:run', (results) => {
        const videosDir = path.join(__dirname, 'cypress/report/videos');
        const backupVideosDir = path.join(__dirname, 'videos_backup');

        if (!fs.existsSync(backupVideosDir)) {
          fs.mkdirSync(backupVideosDir, { recursive: true });
        }

        fs.readdirSync(videosDir).forEach(file => {
          const srcPath = path.join(videosDir, file);
          const destPath = path.join(backupVideosDir, `${Date.now()}_${file}`);
          fs.renameSync(srcPath, destPath);
        });

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
              fs.renameSync(srcPath, destPath);
            });
          }
        }
      });

      return config;
    },

    baseUrl: "https://example.cypress.io/",
  },
});
