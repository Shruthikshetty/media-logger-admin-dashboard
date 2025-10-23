/// <reference types="vitest" />
import path from 'path';
import { fileURLToPath } from 'node:url';

// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'], // you can add 'lcov' too
      all: true, // include files even if not tested
      exclude: ['node_modules/', 'vitest.setup.ts'],
    },
  },
  build: {
    sourcemap: false, // Disable source maps for the build process
  },
});
