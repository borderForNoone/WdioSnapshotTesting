import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveText(
            expect.stringContaining('You logged into a secure area!')
        );
        await expect(await $('#flash').getText()).toMatchSnapshot();
        await expect(SecurePage.flashAlert).toMatchElementSnapshot('flashAlert');
    });

    it('should be able to create a fullpage screenshot', async () => {
        await browser.url('http://guinea-pig.webdriver.io/image-compare.html');
        await $('.hero__title-logo').waitForDisplayed();

        await expect(browser).toMatchFullPageSnapshot('fullpage', {
            enableLayoutTesting: true,
            hideAfterFirstScroll: [await $('nav')]
        });
    });
});