const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

// ============================================================
// ESCAPAR XML PARA JUNIT (evita errores en Jenkins)
// ============================================================
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

module.exports = defineConfig({

  // ============================================================
  // REPORTER PRINCIPAL: MOCHAWESOME (solo JSON)
  // ============================================================
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/report",
    charts: true,
    saveJson: true,
    html: false,                 // NO generar HTML (lo hace Jenkins)
    embeddedScreenshots: false,  // evita duplicados
    inlineAssets: false,         // evita carpeta assets
    saveScreenshots: false,      // evita duplicados en report/screenshots
    saveVideos: false            // evita duplicados en report/videos
  },

  // ============================================================
  // VIDEOS Y SCREENSHOTS (solo los de Cypress)
  // ============================================================
  video: true,
  videosFolder: "cypress/videos",
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",

  // ============================================================
  // ENV (incluye timezone para Allure)
  // ============================================================
  env: {
    allure: true,
    allureTimezone: "local"
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
      allureWriter(on, { ...config, timezone: "local" });
      console.log("🔥 Allure plugin cargado con timezone local");

      // ============================================================
      // ACTIVAR MOCHAWESOME (solo JSON)
      // ============================================================
      require("cypress-mochawesome-reporter/plugin")(on);
      console.log("📊 Mochawesome plugin cargado");

      // ============================================================
      // GENERAR JUNIT PARA JENKINS (XML limpio y válido)
      // ============================================================
      on("after:spec", (spec, results) => {

        const junitDir = path.join(__dirname, "cypress/results");
        if (!fs.existsSync(junitDir)) fs.mkdirSync(junitDir, { recursive: true });

        const specName = path.basename(
          spec.relative || spec.specFile || spec.name || `spec-${Date.now()}`
        );

        const safeName = specName.replace(/[^a-zA-Z0-9]/g, "_");
        const junitFile = path.join(junitDir, `results-${safeName}.xml`);

        // Si el spec falla antes de ejecutar tests
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

        const failures = results.tests.filter(t => t.state === "failed").length;

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="${specName}" tests="${results.tests.length}" failures="${failures}" errors="0" skipped="0">
${results.tests
    .map(t => {
      const name = escapeXml(t.title.join(" "));
      const classname = safeName;

      if (t.state === "failed") {
        const error = escapeXml(t.displayError || "Test failed");
        return `<testcase classname="${classname}" name="${name}">
  <failure message="Test failed" type="AssertionError">
    ${error}
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
      // IMPORTANTE:
      // NO HAY after:run → evita duplicados y JSON corruptos
      // ============================================================

      return config;
    }
  }
});
