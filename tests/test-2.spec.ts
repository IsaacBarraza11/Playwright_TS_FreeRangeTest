import { test, expect } from '@playwright/test';

test.describe('Navegacion en https://www.freerangetesters.com/', () => {

    const secciones = [
        {nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos'},
        {nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Cursos'},
        {nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos'},
        {nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers'}
    ];

    // con el tipo de variable CONST si cambian los recuros, si se pone var no se modifica y se queda con el utlimo recuros ingresado
    for (const sections of secciones){
        test.skip(`Validar la redireccion a la seccion "${sections.nombre}"`, async ({ page }) => {

        await test.step('Ingresando en la web principal https://www.freerangetesters.com', async () => {
            await page.goto('https://www.freerangetesters.com');
            await expect(page).toHaveTitle('Free Range Testers');
        });

        await test.step(`Doy click a la pestania de "${sections.nombre}"`, async () => {
            await page.locator('#page_header').getByRole('link', { name: sections.nombre, exact:true}).click();
            await page.waitForURL(`**${sections.url}`);
        });

        await test.step(`Soy Redirigido a la seccion con titulo"${sections.tituloEsperado}"`, async() => {
            await expect(page).toHaveTitle(sections.tituloEsperado);
        })
    });
    }
    /*
    test('Los links redirigen correctamente', async ({page}) => {
        await test.step('Ingresando en la web principal', async () => {
            await page.goto('https://www.freerangetesters.com');
            await expect(page).toHaveTitle('Free Range Testers');
        });

        await test.step('Doy click a la pestania de "Cursos"', async () => {
            await page.locator('#page_header').getByRole('link', { name: 'Cursos', exact:true}).click();
            await page.waitForURL('** /cursos');
        });

        await test.step('Soy Redirigido a "Cursos"', async() => {
            await expect(page).toHaveTitle('Cursos');
        })
    });
    */
});