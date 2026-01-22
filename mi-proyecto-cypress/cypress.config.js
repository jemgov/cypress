const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({

  // ============================================================
  // REPORTER PRINCIPAL: MOCHAWESOME (ESTABLE)
  // ============================================================
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/report",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    json: true,
    html: false,
    saveHtml: false
  },

  // ============================================================
  // VIDEOS Y SCREENSHOTS
  // ============================================================
  video: true,
  videosFolder: "cypress/videos",
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",

  // ============================================================
  // ENV
  // ============================================================
  env: {
    allure: true
  },

  retries: {
    runMode: 2,
    openMode: 1
  },

  e2e: {
    trashAssetsBeforeRuns: false,

    setupNodeEvents(on, config) {

      // ============================================================
      // ACTIVAR ALLURE
      // ============================================================
      allureWriter(on, config);

      // ============================================================
      // ACTIVAR MOCHAWESOME
      // ============================================================
      require("cypress-mochawesome-reporter/plugin")(on);

      // ============================================================
      // 🔥 NUEVO HOOK JUNIT — COMPATIBLE CON JENKINS
      // ============================================================
      on("after:spec", (spec, results) => {
        const junitDir = path.join(__dirname, "cypress/results");
        if (!fs.existsSync(junitDir)) fs.mkdirSync(junitDir, { recursive: true });

        const junitFile = path.join(
          junitDir,
          `results-${spec.name.replace(/[^a-zA-Z0-9]/g, "_")}.xml`
        );

        // Si el spec falla antes de ejecutar tests → generamos XML mínimo
        if (!results || !results.tests || results.tests.length === 0) {
          const xml = `
<testsuite name="${spec.name}" tests="1" failures="1">
  <testcase name="${spec.name}">
    <failure message="Spec failed before running tests">Spec failed before running tests</failure>
  </testcase>
</testsuite>`;
          fs.writeFileSync(junitFile, xml);
          return;
        }

        // XML estándar cuando sí hay tests
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<testsuite name="${spec.name}" tests="${results.tests.length}" failures="${results.stats.failures}" skipped="${results.stats.skipped}" time="${results.stats.wallClockDuration / 1000}">\n`;

        results.tests.forEach((test) => {
          const testName = test.title.join(" ");
          const duration = (test.wallClockDuration || 0) / 1000;

          xml += `  <testcase classname="${spec.name}" name="${testName}" time="${duration}">`;

          if (test.state === "failed") {
            const error = test.displayError || "Test failed";
            xml += `\n    <failure message="${error.replace(/"/g, "'")}">${error}</failure>\n  `;
          }

          if (test.state === "skipped") {
            xml += `\n    <skipped />\n  `;
          }

          xml += `</testcase>\n`;
        });

        xml += `</testsuite>`;
        fs.writeFileSync(junitFile, xml);
      });

      // ============================================================
      // AFTER:RUN → MERGE MOCHAWESOME + GENERAR HTML + BACKUPS
      // ============================================================
      on("after:run", () => {

        const reportDir = path.join(__dirname, "cypress/report");
        const jsonsDir = path.join(reportDir, ".jsons");

        if (!fs.existsSync(jsonsDir)) {
          fs.mkdirSync(jsonsDir, { recursive: true });
        }

        // Mover JSONs generados por mochawesome
        const jsonFiles = fs
          .readdirSync(reportDir)
          .filter(f => f.endsWith(".json") && f !== "mochawesome.json");

        jsonFiles.forEach(file => {
          fs.renameSync(
            path.join(reportDir, file),
            path.join(jsonsDir, file)
          );
        });

        // MERGE incluso si solo hay 1 JSON
        try {
          execSync(
            `npx mochawesome-merge ${jsonsDir}/*.json > ${reportDir}/mochawesome.json`,
            { stdio: "inherit" }
          );

          execSync(
            `npx marge ${reportDir}/mochawesome.json --reportDir ${reportDir} --inline --reportFilename index.html`,
            { stdio: "inherit" }
          );
        } catch (err) {
          console.error("Error generando mochawesome:", err);
        }

        // ============================================================
        // BACKUP DE VIDEOS ORGANIZADO POR FECHA Y NOMBRE DEL TEST
        // ============================================================
        const videosDir = path.join(__dirname, "cypress/videos");
        const backupRoot = path.join(__dirname, "videos_backup");

        if (!fs.existsSync(backupRoot)) {
          fs.mkdirSync(backupRoot, { recursive: true });
        }

        // Fecha del run (YYYY-MM-DD)
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const dateFolder = `${yyyy}-${mm}-${dd}`;

        const backupDateDir = path.join(backupRoot, dateFolder);
        if (!fs.existsSync(backupDateDir)) {
          fs.mkdirSync(backupDateDir, { recursive: true });
        }

        // Copiar vídeos
        if (fs.existsSync(videosDir)) {
          fs.readdirSync(videosDir).forEach(file => {
            if (file.endsWith(".mp4")) {

              const specName = file.replace(".mp4", "");
              const specDir = path.join(backupDateDir, specName);

              if (!fs.existsSync(specDir)) {
                fs.mkdirSync(specDir, { recursive: true });
              }

              const src = path.join(videosDir, file);
              const dest = path.join(specDir, file);

              fs.copyFileSync(src, dest);
            }
          });
        }
      });

      return config;
    }
  }
});
