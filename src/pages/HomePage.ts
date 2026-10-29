import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  protected readonly path = '/';
  readonly body: Locator;

  constructor(page: Page) {
    super(page);
    this.body = page.locator('body');
  }
}
