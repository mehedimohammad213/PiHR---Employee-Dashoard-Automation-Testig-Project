module.exports = {
  default: {
    requireModule: ["ts-node/register/transpile-only"],
    require: ["features/step-definitions/**/*.ts", "features/support/**/*.ts"],
    paths: ["features/**/*.feature"],
    format: ["progress-bar", "html:../../cucumber-report.html"],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true,
  },
};
