import { test, expect } from '@fixtures/index';

test.describe('Strona główna', () => {
  test('otwiera się poprawnie', async ({ homePage }) => {
    await homePage.open();
    await expect(homePage.body).toBeVisible();
  });
});
