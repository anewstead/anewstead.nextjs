module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
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
