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
      // GENERAR JUNIT PARA JENKINS (COMPATIBLE 100%)
      // ============================================================
      on("after:spec", (spec, results) => {

        const junitDir = path.join(__dirname, "cypress/results");
        if (!fs.existsSync(junitDir)) fs.mkdirSync(junitDir, { recursive: true });

        const specName = path.basename(
          spec.relative || spec.specFile || spec.name || `spec-${Date.now()}`
        );

        const safeName = specName.replace(/[^a-zA-Z0-9]/g, "_");
        const junitFile = path.join(junitDir, `results-${safeName}.xml`);

        // ⚠️ Si el spec falla ANTES de ejecutar tests → generar XML mínimo
        if (!results || !results.tests || results.tests.length === 0) {
          const xml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="${specName}" tests="1" failures="1" errors="0" skipped="0">
    <testcase classname="${safeName}" name="${specName}">
      <failure message="Spec failed before running tests" type="SpecError">
        Spec failed before running tests
      </failure>
    </testcase>
  </testsuite>
</testsuites>`;
          fs.writeFileSync(junitFile, xml);
          return;
        }

        // Contar fallos reales
        const failures = results.tests.filter(t => t.state === "failed").length;

        // XML estándar con soporte completo para Jenkins
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="${specName}" tests="${results.tests.length}" failures="${failures}" errors="0" skipped="0">
    ${results.tests
      .map(t => {
        const name = t.title.join(" ");
        const classname = safeName;

        if (t.state === "failed") {
          return `<testcase classname="${classname}" name="${name}">
      <failure message="Test failed" type="AssertionError">
        ${t.displayError || "Test failed"}
      </failure>
    </testcase>`;
        } else {
          return `<testcase classname="${classname}" name="${name}" />`;
        }
      })
      .join("\n")}
  </testsuite>
</testsuites>`;

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
