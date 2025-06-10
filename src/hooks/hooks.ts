import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
    getEnv();
    browser = await invokeBrowser();
});

Before(async () => {
    context = await browser.newContext({
        viewport: {
            width: 1920,
            height: 1080
        }
    });
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async () => {
    await pageFixture.page.close();
    await context.close();
});

AfterAll(async () => {
    await browser.close();
});