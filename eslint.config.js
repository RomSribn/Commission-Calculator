import path from "path";
import { fileURLToPath } from "url";
// eslint
import pluginJs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
// plugins
import sonarjs from 'eslint-plugin-sonarjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

export default [
    pluginJs.configs.recommended,
    sonarjs.configs.recommended,
    ...compat.extends("eslint-config-airbnb-base"),
    {
        rules: {
            semi: "error",
            "prefer-const": "error",
            "no-empty-pattern": 0,
            "no-unused-vars": 0,
            "import/extensions": "off", // Turn off extension requirements for imports
            "import/no-unresolved": "off" // Disable unresolved imports check for aliases
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js"],
                    map: [
                        ["#calculators", "./src/calculators"],
                        ["#tests", "./src/tests"],
                        ["#utils", "./src/utils"],
                        ["#config", "./src/config.js"]
                    ]
                }
            }
        }
    }
];
