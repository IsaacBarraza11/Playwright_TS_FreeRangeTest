import { test, expect, defineConfig } from '@playwright/test';

const REPO = 'test-git';
const USER = 'isaacbarraza_2O0N9C7Q';

// para no agregar los Headers en cada caso se pueden agregar de manera global
export default defineConfig({
  use: {
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    }
  }
});

// Normalmente se utiliza con un Post para crear data con el before all, se trabaja con lo demas y con after all se borra todo lo creado
    test.beforeAll(async ({ request }) => {
        // Se lanza el Request
        await request.post('api/v1/json/3/all_leagues.php', {
            data: {
                leagues: [
                    {
                        idLeague: "4412",
                        strLeague: "Copa MX",
                        strSport: "Soccer",
                        strLeagueAlternate: "Copita MX"
                    }
                ]
            }
        });
    });

    test.afterAll(async ({ request }) => {
        await request.post('api/v1/json/3/all_leagues.php', {
            data: {
                leagues: [
                    {
                        idLeague: "4412",
                        strLeague: "Copa MX",
                        strSport: "Soccer",
                        strLeagueAlternate: "Copita MX"
                    }
                ]
            }
        });
    })


test('should extract all leagues', async ({ request }) => {
    // toma el tiempo inicial antes de ejecutar el Request
    const start = Date.now();
    // Se lanza el Request
    const listAllLeagues = await request.get('api/v1/json/3/all_leagues.php');
    // se toma el tiempo despues de ejecutarse el Request
    const duration = Date.now() - start;
    // extrae el status del Request
    expect(listAllLeagues.status()).toBe(200);
    // Assertion para identificar si el Request se ejecuto en el tiempo indicado
    expect(duration).toBeLessThan(800);
  
    // a variable to extrat the json given from API
    const data = await listAllLeagues.json();
    expect(data.leagues).toContainEqual(expect.objectContaining({
            idLeague: "4328",
            strLeague: "English Premier League",
            strSport: "Soccer",
            strLeagueAlternate: "Premier League, EPL"
            }));
        
    const dataLeague = await listAllLeagues.text();
    expect(dataLeague).toContain('leagues');
    expect(JSON.stringify(data)).toContain('idLeague');
    expect(JSON.stringify(data)).toContain('strLeague');
    expect(JSON.stringify(data)).toContain('strSport');
    expect(JSON.stringify(data)).toContain('strLeagueAlternate');

    // muestra en el reporte HTML el Json del response
    await test.info().attach('API Response', {
    body: JSON.stringify(data, null, 2),
    contentType: 'application/json'
  });


});

test('sending and assert headers', async ({ request }) => {
    const listAllLeagues = await request.get('api/v1/json/3/all_leagues.php', {
        headers: {
            'Content-Type': 'application/json',
            'Server': 'cloudflare'
        },
        /*
        // Asi se puede agregar data y headers dentro del request
        data: {
                leagues: [
                    {
                        idLeague: "4412",
                        strLeague: "Copa MX",
                        strSport: "Soccer",
                        strLeagueAlternate: "Copita MX"
                    }
                ]
            }
        */
    });
    // extrae el status del Request
    expect(listAllLeagues.status()).toBe(200);

    // Obtener headers como objeto
    const headers = listAllLeagues.headers();
    console.log(headers); // Para ver todos

    // Validar que exista Content-Type
    expect(headers).toHaveProperty('content-type');

    // Validar que el valor contenga "application/json"
    expect(headers['content-type']).toContain('application/json');

    // validar varios headers
    expect(headers).toMatchObject({
    'content-type': expect.stringContaining('application/json'),
    'server': expect.stringContaining('cloudflare')
  });

    // muestra en el reporte HTML el Json de los headers
    await test.info().attach('API Response', {
    body: JSON.stringify(headers, null, 2),
    contentType: 'application/json'
  });

});

test('sending a bad request', async ({ request }) => {
    const listAllLeagues = await request.put('api/v1/json/3/all_leagues.php');
        // extrae el status del Request
        expect(listAllLeagues.status()).toBe(405);
    });