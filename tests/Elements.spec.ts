import { test, expect } from '@playwright/test';

test.describe('Navegacion en https://www.freerangetesters.com/', () => {

  test('Validar la redireccion a la seccion Recursos', async ({ page }) => {

        await test.step('Ingresando en la web principal https://www.freerangetesters.com', async () => {
            await page.goto('https://www.freerangetesters.com');
            await expect(page).toHaveTitle('Free Range Testers');
        });

        await test.step('Doy click a la pestania de Recursos', async () => {
          // aqui se utiliza el getByRole (es una opcion que da Playwright en la parte de Testing en la parte de Pick locator)
            await page.locator('#page_header').getByRole('link', { name: 'Recursos', exact:true}).click();
            await page.waitForURL('**/recursos');
        });

        await test.step('Soy Redirigido a la seccion con titulo Recursos', async() => {
            await expect(page).toHaveTitle('Recursos');
        });
  });

  test('Validar Elemento tipo GetByRole', async ({ page }) =>{

    await test.step('Ingresando en la web principal https://www.freerangetesters.com', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    // GetByRole
    await test.step('Validar el Elemento tipo GetByRole', async () => {
      // puede usarse button, combobox, alert, etc, tiene muchas opciones dependiendo lo requerido
      await page.getByRole('button', {name:'Hacé click para generar un ID'}).click();
      var textFromBtn = page.getByText('OMG, aparezco después de 3 segundos');
      await textFromBtn;
      await expect(textFromBtn).toHaveText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.');
      await page.screenshot({path: 'screens/ScreenGetByRole.png'});
    });
  });

  test('Validar Elemento tipo GetByText', async ({ page }) =>{

    await test.step('Ingresando en la web principal https://www.freerangetesters.com', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    // GetByText
    await test.step('Validar el Elemento tipo GetByText', async () => {
      var textByText = page.getByText('Un aburrido texto');
      await textByText;
      await expect(textByText).toHaveText('Un aburrido texto');
      await page.screenshot({path: 'screens/ScreenGetByText.png'});
    });
  });

  test('Validar Elemento tipo getByLabel y getByPlaceholder', async ({ page }) => {

    await test.step('Ingresando en la web principal https://www.freerangetesters.com', async () => {
      await page.goto('https://www.freerangetesters.com/login');
    });

    // getByLabel y getByPlaceholder
    await test.step('Validar el Elemento tipo getByLabel y getByPlaceholder', async() => {
      // getByLabel es el nombre del label 
      await page.getByLabel('Correo electrónico').fill('isaac@gmail.com');
      // getByPlaceholder lo que se encuentra dentro del input
      await page.getByPlaceholder('••••••••').fill('isaac123');
      await page.screenshot({path: 'screens/ScreenLabelAndPlace.png'});
    });
  });

 // importante pedir a nuestro DEV agregar el data-testid para pruebas
  test('Validar Elemento tipo getByTestId', async ({ page }) => {

    await test.step('Ingresando en la web principal https://www.freerangetesters.com', async () => {
      await page.goto('https://www.freerangetesters.com/recursos');
    });

    // getByTestId
    await test.step('Validar el Elemento tipo getByTestId', async() => {
      await page.getByTestId('desktop-menu').click();
      await expect(page).toHaveTitle('Acceder a Free Range Testers');
      await page.screenshot({path: 'screens/ScreenGetByTestId.png'});
    });
  });

  test('Validar Elemento tipo css y xpath locator', async ({ page }) => {

    await test.step('Ingresando en la web principal https://www.freerangetesters.com', async () => {
      await page.goto('https://www.freerangetesters.com/recursos');
    });

    await test.step('Validar el Elemento tipo css y xpath locator', async() => {
      var xpTest = page.locator('xpath=//h2[text()="Recursos valiosos para todo el mundo"]');
      await expect(xpTest).toHaveText('Recursos valiosos para todo el mundo');
      await page.screenshot({path: 'screens/ScreenXpath.png'});
    });
  });

  test.skip('Listas', async ({ page }) => {

    await test.step('Ingresando en la web principal https://www.freerangetesters.com', async () => {
      await page.goto('https://www.freerangetesters.com');
    });

    await test.step('Buscar elementos en listas con getByRole', async() => {
      await page
      .getByRole('listitem')
      .filter( {hasText: 'Selenium con Python y PyTest'} ).click();
      await page.screenshot({path: 'screens/ScreenListByRole.png'});
    });

    await test.step('Buscar elementos en listas simple', async() => {
      await page.locator('//img[@src="https://www.freerangetesters.com/content-assets/public/eyJhbGciOiJIUzI1NiJ9.eyJvYmplY3Rfa2V5IjoiZGR5OWhuZG9uNHdtcDR3MmtybGJvZXpxc2k3OCIsImRvbWFpbiI6Ind3dy5mcmVlcmFuZ2V0ZXN0ZXJzLmNvbSJ9.G3ox-zFL6c9doO1c8uJ69amJtuivddeQFaJtY5T7ogk"]').click();
      await page.getByText('AWS a fondo para Testers').click();
      await page.screenshot({path: 'screens/ScreenListSimple.png'});
    });
  });

 /*
 // tomando en cuenta que hay dos elementos iguales, en este caso el boton
 <ul>
  <li>
  <h3>Play 5</h3>
  <button>Add to cart</button>
  </li>
  <li>
  <h3>Xbox X</h3>
  <button>Add to cart</button>
  </li>
 </ul>

 // se haria una busqueda como la siguiente 
await test.step('Validar el Elemento igual', async () => {
      await page.getByRole('listitem'
      .filter({ hasText: 'Play 5' })
      .getByRole('button', { name: 'Add to cart' })
      .click();

      // esta es otra maner de realizarlo
      await page.getByRole('listitem'
      .filter({ has: page.getByRole('heading', { name: 'Xbox X'})})
      .getByRole('button', { name: 'Add to cart' })
      .click();
    });
 */



});