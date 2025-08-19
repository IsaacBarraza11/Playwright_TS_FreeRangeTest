import { test, expect, defineConfig } from '@playwright/test';

test('Haciendo mock de una fruta que no existe en la API real', async ({ page }) => {
    
    // se hace el mock antes de navegar
    await page.route('*/**/api/v1/fruits', async (route) => { // se agrega la ruta del api
      const json = [{ name: 'Lulo', id: 21 }, { name: 'Mango', id: 1 }]; // se agregan los datos a mockear que queremos ver
      await route.fulfill({ json }); // se agregan los datos del json creado
    });

    // Navegamos a la pagina
    await page.goto('https://demo.playwright.dev/api-mocking');
  
    // Se valida que Lulo se vea disponible
    await expect(page.getByText('Lulo')).toBeVisible();
    await expect(page.getByText('mango')).toBeVisible();


    //await request.get('https://demo.playwright.dev/api-mocking/');
});


test('Obtiene la respuesta real y se modifica el request', async ({ page }) => {
    // se obtiene la respuesta y se agrega el extra
    await page.route('*/**/api/v1/fruits', async (route) => {
      const response = await route.fetch(); // fetch trae la respuesta del API (JSON)
      const json = await response.json(); // se obtiene la lista de frutas en formato json
      json.push({ name: 'Isaac', id: 23 }, { name: 'Barraza', id: 24 });
      // Obtenemos la respuesta real mientras que le agregamos un extra
    // al objeto JSON que va a estar siendo representado.
      await route.fulfill({ response, json }); // pasa la respuesta mas el json que vamos a agregar
    });
    
    // Navegamos a la pagina
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Se valida que Lulo se vea disponible
    await expect(page.getByText('Isaac')).toBeVisible();
    await expect(page.getByText('Barraza')).toBeVisible();
  });