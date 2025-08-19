import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'busca' }).fill('Iron man');
  await page.keyboard.press('Enter');
});

test.describe('Hola', () =>{
  test('New Hola', async ({ page }) => {
    
  })
  
});