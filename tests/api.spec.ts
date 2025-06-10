import 'dotenv/config';
import { test, expect, request } from '@playwright/test';

// Define the API endpoint
const url = 'https://petstore.swagger.io/v2/pet';
// Define headers
const headers = {
    'Content-Type': 'application/json',
    'api_key': process.env.API_KEY as string // Required for Petstore API authorization
};

//const apiContext = await request.newContext();

const petId = Math.floor(Math.random() * 10000);

const petData = {
    id: petId,
    category: {
        id: 1,
        name: 'Dogs'
    },
    name: 'Fido-matotej-0044',
    photoUrls: ['https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/18d0/live/88ff5600-d979-11ef-a5c8-1da73bd59591.jpg'],
    tags: [
    {
        id: 1,
        name: 'friendly'
    }
    ],
    status: 'available'
};

const updatedPetData = {
    ... petData,
    name: 'Lessie is my new name',
    status: 'sold'
};


test.describe('Petstore API', () => {
/*
    test('Create a new pet in Petstore API', async ({ request }) => {
       
        // Send the POST request
        const response = await request.post(url, {
            headers: headers,
            data: petData
        });

        // Validate the response
        expect(response.status()).toBe(200); // Expect HTTP 200 for successful creation
    
        // Parse and validate the response body
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id', petData.id);
        expect(responseBody).toHaveProperty('name', petData.name);
        expect(responseBody).toHaveProperty('status', petData.status);
        expect(responseBody.category).toHaveProperty('name', petData.category.name);
        console.log('Pet created successfully:', responseBody);
    });
*/
    test('Get created pet from Petstore API', async ({ request }) => {

        /*
        const apiContext = await request.newContext();
        const userCreateResponse = await apiContext.get(
            'https://petstore.swagger.io/v2/pet/findByStatus?status=available',
        );

        console.log(await userCreateResponse.json());
*/

        console.log(`${url}/3370`);

        const response = await request.get(`${url}/3370`, {
            headers: headers
        });

        /*
        const apiContext1 = await request.newContext();
        const response = await apiContext1.get(`${url}/pet/3370`, {
            headers: headers
        });
*/
        //headers: {'accept':'application/json'}

        console.log(await response);
        console.log(await response.json());

        // Assert status code
        expect(response.status(), `Expected 200, got ${response.status()}`).toBe(200);

        console.log('Pet fetched successfully:', await response.json());
    });
/*
    test('Delete created pet from Petstore API', async ({ request }) => {
        console.log(`${url}/pet/${petData.id}`);
        const response = await request.delete(`${url}/pet/${petData.id}`,
        {
            headers: headers
        });

        // Assert status code
        expect(response.status(), `Expected 200, got ${response.status()}`).toBe(200);

        // Verify pet is deleted (should return 404)
        const getResponse = await request.get(`${url}/pet/${petData.id}`);
        expect(getResponse.status(), `Expected 404, got ${getResponse.status()}`).toBe(404);
    });
    */

    test('DELETE /pet/{petId} - Invalid pet ID (Status 400)', async ({ request }) => {
        try {
            const invalidPetId = 'invalid-id'; // Non-numeric ID
            /*const response = await request.delete(`${url}/${invalidPetId}`,
            {
                headers: headers
            });
            */

            const response = await request.delete(`${url}/${invalidPetId}`);
    
             // Assert status code
            expect(response.status(), `Expected 400, got ${response.status()}`).toBe(400);
        } catch (error) {
            console.log('DELETE /pet/{petId} - Invalid pet ID', error);
            throw error;
        }
      });
});