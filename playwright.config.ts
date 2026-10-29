import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Brak zmiennej środowiskowej ${name}. Uzupełnij plik .env (wzór: .env.example).`);
  }
  return value;
}

const BASE_URL = requireEnv('BASE_URL');
const API_URL = requireEnv('API_URL');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'], baseURL: BASE_URL },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: API_URL.endsWith('/') ? API_URL : `${API_URL}/`,
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});
