module.exports = {
  env: {
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["cypress/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
