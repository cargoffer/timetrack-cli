import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: '.',
    css: false,
  },
  // Prevent vitest from resolving parent postcss/tailwind config
  postcss: {
    plugins: [],
  },
});
