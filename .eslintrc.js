/**
 * next/core-web-vitals uses:
 * - eslint:recommended
 * eslint airbnb uses:
 * - eslint-plugin-import
 * - eslint-plugin-react
 * - eslint-plugin-react-hooks
 * - eslint-plugin-jsx-a11y
 * airbnb-typescript uses:
 * - @typescript-eslint/eslint-plugin
 */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "check-file", "prettier"],
  extends: [
    "next/core-web-vitals",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "prettier",
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
        // glob for nextjs pages: kebab-case + start with '_' or '[' and end with ']'
      },
      { ignoreMiddleExtensions: true },
    ],
    "check-file/folder-naming-convention": [
      "error",
      { "src/**/": "KEBAB_CASE" },
    ],

    "arrow-body-style": ["error", "always"],
    "arrow-parens": ["error", "always"],
    curly: "error",
    "import/prefer-default-export": "off",
    "no-confusing-arrow": ["error", { allowParens: true }],
    "no-mixed-operators": "error",
    "prefer-arrow-callback": "error",
    "prefer-template": "error",

    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-no-useless-fragment": "off",

    "react/function-component-definition": [
      "warn",
      { namedComponents: "arrow-function" },
    ],

    "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
  },
};
