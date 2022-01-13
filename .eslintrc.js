module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended", "prettier"],
  plugins: [],
  // add your custom rules here
  rules: {},
  globals: {
    // Avoid eslint errors since these methods are auto imported, and do not need to be manually declared.
    inject: "true",
    provide: "true",
    ref: "true",
  },
};
