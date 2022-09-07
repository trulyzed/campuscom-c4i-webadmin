module.exports = {
  extends: ["plugin:import/typescript", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:import/errors", "plugin:import/warnings", "plugin:import/typescript"],
  plugins: ["@typescript-eslint", "import"],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    "import/namespace": "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 200,
        singleQuote: false,
        useTabs: false,
        tabWidth: 2,
        trailingComma: "none",
        semi: false
      }
    ],
    "no-console": 0,
    "no-return-assign": "off",
    "no-unreachable": 2,
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/named": 0,
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  globals: {},
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json"
  }
}
