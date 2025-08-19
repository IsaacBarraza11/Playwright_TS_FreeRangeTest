import { type Locator, type Page } from '@playwright/test';


export class SandboxPage{
    readonly page:Page;
    readonly heladoCheckbox: Locator; // se crea el objeto de tipo locator
    readonly radioButtonSI: Locator;
    readonly radioButtonNO: Locator;

    constructor(page:Page){
        this.page = page;
        this.heladoCheckbox = page.getByRole('checkbox', { name: 'Helado 🍧' });
        this.radioButtonSI = page.getByRole('radio', { name: 'Si' });
        this.radioButtonNO = page.getByRole('radio', { name: 'No' });


    }

    async checkHelado(){
        await this.heladoCheckbox.check();
    }

    async uncheckHelado(){
        await this.heladoCheckbox.uncheck();
    }

    async radioSI(){
        await this.radioButtonSI.check();
    }

    async radioNO(){
        await this.radioButtonNO.check();
    }
}