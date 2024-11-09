/** openapi-config.cjs */
/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
const config = {
  schemaFile: "http://localhost:8000/openapi.json",
  apiFile: "./src/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/store/backend.ts",
  exportName: "backend",
  hooks: true,
};

module.exports = config;
