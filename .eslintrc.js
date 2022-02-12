module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb-base", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 13,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],

    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },

  rules: {
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
    "no-console": "off",
    "default-param-last": "off",
    "consistent-return": "off",
    "no-restricted-syntax": "off",
  },
};
