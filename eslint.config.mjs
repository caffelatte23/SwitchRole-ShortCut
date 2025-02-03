import js from "@eslint/js";
import gitignore from "eslint-config-flat-gitignore";
import prettierConfig from "eslint-config-prettier";
import reactReflesh from "eslint-plugin-react-refresh";
import eslintPluginTailwindCSS from "eslint-plugin-tailwindcss";
import unusedImport from "eslint-plugin-unused-imports";
import globals from "globals";
import { config as defineConfig, configs as tseslint } from "typescript-eslint";

import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig(
  gitignore(),
  js.configs.recommended,
  tseslint.recommended,
  compat.extends("plugin:react-hooks/recommended"),
  eslintPluginTailwindCSS.configs["flat/recommended"],
  prettierConfig,
  {
    plugins: {
      "react-refresh": reactReflesh,
      "unused-imports": unusedImport,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
    },
    settings: {
      tailwindcss: {
        groupByResponsive: true,
        whitelist: [],
      },
    },
  }
);
