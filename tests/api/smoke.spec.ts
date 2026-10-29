import { test, expect } from '@fixtures/index';

test.describe('API smoke', () => {
  test('API odpowiada', async ({ apiClient }) => {
    const response = await apiClient.get('');
    expect(response.status()).toBeLessThan(500);
  });
});
