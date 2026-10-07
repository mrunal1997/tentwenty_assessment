import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';

test('standard user completes a backpack purchase', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

  await productsPage.addToCart('Sauce Labs Backpack');
  await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
  await productsPage.openCart();
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

  await cartPage.checkout();
  await checkoutPage.enterInformation('QA', 'Tester', '12345');
  await expect(page.getByText('Item total: $29.99')).toBeVisible();
  await expect(page.getByText('Tax: $2.40')).toBeVisible();
  await expect(page.getByText('Total: $32.39')).toBeVisible();

  await checkoutPage.finishOrder();
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
});