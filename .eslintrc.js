/**
 * eslint airbnb uses:
 * - eslint-plugin-import
 * - eslint-plugin-react
 * - eslint-plugin-react-hooks
 * - eslint-plugin-jsx-a11y
 */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "file-progress",
    "react",
    "@typescript-eslint",
    "check-file",
    "prettier",
  ],
  extends: [
    "next/core-web-vitals",
    "airbnb/hooks",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.json", // required by airbnb
  },
  rules: {
    "file-progress/activate": 1,
    "@typescript-eslint/naming-convention": "warn",
    "check-file/filename-naming-convention": [
      "error",
      {
        "src/!(pages)/**/*.{js,ts}": "CAMEL_CASE",
        "src/!(pages)/**/*.{jsx,tsx}": "PASCAL_CASE",
        "src/pages/**/*.{js,ts,jsx,tsx}":
          "?([|_|[a-z0-9])+([a-z0-9])*(-|[a-z0-9])?(])",
        // glob: kebab-case and allow start with _ or [ and end with ]
      },
      { ignoreMiddleExtensions: true },
    ],
    "check-file/folder-naming-convention": [
      "error",
      { "src/**/": "KEBAB_CASE" },
    ],
    "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
    "arrow-body-style": ["error", "always"],
    "arrow-parens": ["error", "always"],
    curly: "error",
    "no-confusing-arrow": ["error", { allowParens: true }],
    "no-mixed-operators": "error",
    "prefer-arrow-callback": "error",
    "prefer-template": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
  },
};
