import { test, expect } from '@playwright/test';
import { SandboxPage } from './Pages/AutomationPageO.ts'; // se importa la clase SandboxPage del archivo AutomationPageO.spec


let textoA = 'Estoy aprendiendo Playwright 🍕';
test.describe('Test suit for interactions', () => {

    test.beforeEach( async ({ page }) => {
        await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    });

    test('Elemento Click', async ({ page }) => {
        await test.step('click en boton', async () => {
            const buttonIdDinamico = page.getByRole('button', {name: 'Hacé click para generar'});
            await buttonIdDinamico.click();
            //await buttonIdDinamico.dblclick(); // para realizar un doble click
            //await buttonIdDinamico.click({ force: true }); // obliga que se realice el click
            //await buttonIdDinamico.click({ button:'right' }); // hace el click con un boton en especifico, puede ser left, midle
            //await buttonIdDinamico.click({ modifiers:['Shift'] }); // si pide que se haga click con alguna otra tecla, en este caso Shift
            //await buttonIdDinamico.hover(); // cuando se pone el mouse sobre el elemento

            // Assertion
            await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
        });
    });

    test('Elemento Fill', async ({ page }) => {
        await test.step('Escribir sobre elementos', async () => {
            let textAburrido = page.getByRole('textbox', { name: 'Un aburrido texto' });
            await expect(textAburrido).toBeEditable();
            await textAburrido.fill(textoA);
            var expTex = 'Estoy aprendiendo Playwright 🍕';
            // Assertion
            await expect(textAburrido).toHaveValue(expTex);
        });
    });

    test('Elemento Checkboxes y Radio buttons', async ({ page }) => {
        
        const sandbox = new SandboxPage(page); // creacion de iteracion para sandbox POM

        await test.step('Seleccionar checkbox para Helado', async () => {
            await sandbox.checkHelado();
            
            await expect(sandbox.heladoCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();

            /*
            await page.getByRole('checkbox', { name: 'Helado 🍧' }).check();
            await page.getByRole('checkbox', { name: 'Helado 🍧' }).uncheck();
             Assertion
            await expect(page.getByRole('checkbox', { name: 'Helado 🍧' })).toBeChecked(); // para decir que no esta checkeado se pone not.toBeChecked()
            await expect(page.getByRole('checkbox', { name: 'Helado 🍧' }), 'El checkbox no estaba seleccionado').toBeChecked(); // se le pueden agregar comentarios 
            */
        });

        await test.step('Validar deseleccion checkbox para Helado', async () => {
            await sandbox.uncheckHelado();

            await expect(sandbox.heladoCheckbox).not.toBeChecked();
            /*
            await page.getByRole('checkbox', { name: 'Helado 🍧' }).check();
            await page.getByRole('checkbox', { name: 'Helado 🍧' }).uncheck();
             Assertion
            await expect(page.getByRole('checkbox', { name: 'Helado 🍧' })).not.toBeChecked(); // para decir que no esta checkeado se pone not.toBeChecked()
            */
        });

        await test.step('Seleccionar radio buton', async () => {
            
            await sandbox.radioSI();
            await sandbox.radioNO();

            expect(sandbox.radioButtonNO).toBeChecked();

            /*
            await page.getByRole('radio', { name: 'Si' }).check();
            await page.getByRole('radio', { name: 'No' }).check();
            await expect(page.getByRole('radio', { name: 'No' }), 'El radio button no esta seleccionado').toBeChecked();
            await expect(page.getByRole('radio', { name: 'No' }), 'El radio button esta seleccionado').not.toBeChecked();
            */
        });
        
        
    });

    test('Elemento Dropdown', async ({ page }) => {
        await test.step('Desplegar dropdown', async () => {
            let listValues = ['Fútbol', 'Basketball','Tennis','Seleccioná un deporte'];
            let dropDownDeportes = page.locator('#formBasicSelect');
            
            for(let i of listValues){
                const options = await dropDownDeportes.selectOption(i);
                if(options){
                    console.log(options + ' existe');
                }
                else {
                    throw new Error('opcion no presente');
                }
            }

            await page.getByLabel('Dropdown').selectOption('Basketball');
            // Assertion
            await expect(page.locator('#formBasicSelect')).toHaveValue('Basketball');
        });
        
        await test.step('Otro tipo de dropdown', async () => {
            await page.getByRole('button', { name: 'Día de la semana' }).click();
            await page.getByRole('link', { name: 'Jueves' }).click();
        })
        
    });
    
    test('Elemento teclas', async ({ page }) => {
        await test.step('Presionar teclas', async () => {
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textoA);
            for (const a of textoA) {
                await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Shift+ArrowLeft');
            };
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Control+C');
        });
    });
    
    test('Subir archivos', async ({ page }) => {
        await test.step('Subir un archivo', async () => {
            await page.goto('https://the-internet.herokuapp.com/upload');
            await page.getByRole('button', { name: 'Choose File' }).setInputFiles('../FreeRangePW/screens/CV_Isaac_Barraza_Español.pdf');
        })
        
    })
    
    test('Tablas Estaticas', async ({ page }) => {
        await test.step('Assertions con Tablas Estaticas', async () => {
            const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
            const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
            await page.screenshot({path: 'screens/Table.png'});
            expect(valoresColumnaNombres).toEqual(nombresEsperados);
        });
        
    });
    
    test('Tablas Dinamicas', async ({ page }) => {
        await test.step('Trabajando con tablas dinamicas', async () => {
            const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
            console.log(valoresTablaDinamica);

            // se recarga la pagina
            await page.reload();
            const valoresTablaReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
            console.log(valoresTablaReload);

            // validamos que los valores cambiaron despues de un reload
            expect(valoresTablaDinamica).not.toEqual(valoresTablaReload);
        }); 
    });
    
    test('SoftAssertions', async ({ page }) => {
        await test.step('Uso de las soft assertions', async () => {
            // el Soft nos permite continuar validando elementos sin detenerse si encuentra un error
            await expect.soft(page.getByRole('checkbox', { name: 'Helado 🍧' }), 'No se encontro Helado 🍧').toBeVisible();
            await expect.soft(page.getByText('Pizza 🍕'), 'No se encontro Pizza 🍕').toBeVisible();
            await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontro Hamburguesa 🍔').toBeVisible();
            await expect.soft(page.getByText('Pasta 🍝'), 'No se encontro Pasta 🍝').toBeVisible();
            await expect.soft(page.getByText('Torta 🍰'), 'No se encontro Torta 🍰').toBeVisible();
        })
        
    });

    test('Validando dentro de Popup', async ({ page }) => {
        await test.step('haciendo click en el boton de Popup', async () => {
            await page.getByRole('button', { name: 'Mostrar popup' }).click();
            await page.screenshot({path: 'screens/MostrarPupUp.png'});
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
            await page.getByRole('button', { name: 'cerrar'}).click();
            await test.info().attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
            await page.screenshot({path: 'screens/CerrarPupUp.png'});
        });
        
    });
    
    // tipos de anotaciones

    // Skip, only, TAGS e info
    /*
        test.skip // para que se salte el caso de prueba
        
        test.only // solo va a ejecutar este caso
        
        test('Validacion etc etc @Regression') // se pone ese identificador con el @ y en terminal ejecutar ( npx playwright test --grep @Regression ) funciona con cuialquier tag
        
        // se agrega debajo de test('texto, async ({ page }) => { DEBAJO DE ESTO SE AGREGA EL TEST.INFO()})
        test.info().annotations.push({
            type: 'bug', // puede ser algun otro
            description: 'informar si el fix del bug se corrigio'
        });

        test.info().annotations.push({
            type: 'US 1023', // puede ser algun otro
            description: 'Se solicita que el requerimiento realice tal cosa'
        });
    */

    
    // Fix Me, Fail, Screenshot

    /*
        // se agrega debajo de test('texto, async ({ page }) => { DEBAJO DE ESTO SE AGREGA EL TEST.FAIL()})
        test.fail(); // se utiliza para inficar que va a fallar este caso, puede ser porque aun no esta terminada una funcionalidad, se desactivo la funcionalidad, etc
        
        // se agrega debajo de test('texto, async ({ page }) => { DEBAJO DE ESTO SE AGREGA EL TEST.FIXME()}) o puede estar solo a un lado de test
        test.fixme(); // es para indicar que hay que hacerle una mejora o actualizacion

        // debajo de la funcion que nosotros lo pongamos ahi va a tomar un screenshot y lo va a agregar al reporte
        await test.info().attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
    */
    
});