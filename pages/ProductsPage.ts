import type { Locator, Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  product(name: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  async addToCart(name: string): Promise<void> {
    await this.product(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.page.getByRole('button', { name: /Cart/ }).click();
  }
}