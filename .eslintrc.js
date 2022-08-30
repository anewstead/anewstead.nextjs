module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "check-file",
    "prettier",
  ],
  extends: [
    "next/core-web-vitals",
    "airbnb-typescript",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
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
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
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
