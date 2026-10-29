import { test as base, expect } from '@playwright/test';
import { ApiClient } from '@api/ApiClient';
import { HomePage } from '@pages/HomePage';

type Fixtures = {
  homePage: HomePage;
  apiClient: ApiClient;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },
});

export { expect };
