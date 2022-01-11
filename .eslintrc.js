module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        code: 120,
        ignoreComments: true,
      },
    ],
    "no-undef": "off",
    "no-console": "off",
    "no-alert": "off",
    "arrow-body-style": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/ban-ts-comment": "off"
  },
  plugins: ["jest", "@typescript-eslint"],
};
