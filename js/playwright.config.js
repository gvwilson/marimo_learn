import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:7700',
    browserName: 'chromium',
  },
  webServer: {
    command: 'node tests/server.js',
    port: 7700,
    reuseExistingServer: !process.env.CI,
  },
});
