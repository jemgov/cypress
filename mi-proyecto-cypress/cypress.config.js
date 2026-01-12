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

      // Generar reporte JUnit adicional
      on('after:spec', (spec, results) => {
        if (!results || !results.tests) return;

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

        results.tests.forEach(test => {
          const mTest = new mocha.Test(test.title.join(' '));
          mochaSuite.addTest(mTest);

          if (test.state === 'failed') {
            mTest.state = 'failed';
            mTest.err = test.displayError;
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