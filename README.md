# Greentube QA assignment

## Instalation

1. Clone repository and use `npm install` to install dependencies.

### UI E2E test with Gherkin

2. Go to `/src/helper/env` folder and create files `.env.prod.chrome` and `.env.prod.chrome`.
3. Open browser and navigate to `https://www.gametwist.com/en/` and register a new user.
4. Store login credentials to both `.env` files.
5. To execute tests in Chrome run `npm run cucumber-chrome` or to execute them in Firefox run `npm run cucumber-firefox`.
6. Test results are stored in `/reports` folder

### Petstore Swagger API tests
2. On root of the projec create a new `.env` file.
3. Open browser and navigate to `https://petstore.swagger.io/`.
4. Click on `Authorize` button in the upper right corrner and set new `api_key`.
5. Paste key to `.env` file under key `API_KEY`.
6. To execute API test run `npx playwright test`.
7. Test results are stored in `/test-results` folder.




