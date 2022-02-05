import { defineNuxtConfig } from "@nuxt/bridge";
import smConfig from "./sm.json";

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-starter-prismic",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module", // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "nuxt-sm",
    "@nuxtjs/prismic",
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vue-slicezone", "nuxt-sm", "sm-commons"],
  },
  storybook: {
    stories: [
      "~/slices/**/*.stories.[tj]s",
      "~/.slicemachine/**/*.stories.[tj]s",
    ],
  },
  ignore: ["**/*.stories.js"],
  generate: {
    fallback: "404.html", // Netlify reads a 404.html, Nuxt will load as an SPA
  },
  prismic: {
    endpoint: smConfig.apiEndpoint || "",
    modern: true,
    linkResolver: "@/plugins/link-resolver",
  },
  tailwindcss: {
    viewer: false,
    config: {
      /* Extend the Tailwind config here */
      purge: {
        content: ["components/**/*.vue", "pages/**/*.vue", "slices/**/*.vue"],
      },
    },
  },
});
