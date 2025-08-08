// eslint.config.js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: ["dist/**"],
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json", // 👈 explicitly point to your tsconfig
        },
      },
    },
  },
]);
