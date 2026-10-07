import type { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async checkout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}