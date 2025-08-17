/// <reference types="vitest" />
import path from "path";

// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src/"),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      reporter: ["text", "json", "html"], // you can add 'lcov' too
      all: true, // include files even if not tested
      exclude: ["node_modules/", "vitest.setup.ts"],
    },
  },
});