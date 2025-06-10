import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'https://www.gametwist.com/en',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },
});
