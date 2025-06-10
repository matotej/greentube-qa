import 'dotenv/config';
import { test, expect, request } from '@playwright/test';

// Define the API endpoint
const url = 'https://petstore.swagger.io/v2/pet';
// Define headers
const headers = {
    'Content-Type': 'application/json',
    'api_key': process.env.API_KEY as string // Required for Petstore API authorization
};

// Generate random ID for pet
const petId = Math.floor(Math.random() * 10000);

const petData = {
    id: petId,
    category: {
        id: 1,
        name: 'Dogs'
    },
    name: 'Fido-matotej-007',
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

    test('GET request on a Create new pet in Petstore API', async ({ request }) => {
       
        // Send the POST request
        const response = await request.get(url, {
            headers: headers,
            data: petData
        });

        // Validate the response
        expect(response.status()).toBe(405); // Expect HTTP 405 Method not allowed
    });


    test('Get created pet from Petstore API', async ({ request }) => {

        const response = await request.get(`${url}/${petData.id}`, {
            headers: headers
        });

        // Validate the response
        expect(response.status()).toBe(200); // Expect HTTP 200 for successful creation
    
        // Parse and validate the response body
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id', petData.id);
        expect(responseBody).toHaveProperty('name', petData.name);
        expect(responseBody).toHaveProperty('status', petData.status);
        expect(responseBody.category).toHaveProperty('name', petData.category.name);
        console.log('Pet fetched successfully:', responseBody);
    });

    test('Update the new pet in Petstore API', async ({ request }) => {
       
        // Send the PUT request for update
        const response = await request.put(url, {
            headers: headers,
            data: updatedPetData
        });

        // Validate the response
        expect(response.status()).toBe(200); // Expect HTTP 200 for successful creation
    
        // Parse and validate the response body
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id', updatedPetData.id);
        expect(responseBody).toHaveProperty('name', updatedPetData.name);
        expect(responseBody).toHaveProperty('status', updatedPetData.status);
        console.log('Pet updated successfully:', responseBody);
    });

    test('Delete created pet from Petstore API', async ({ request }) => {
        const response = await request.delete(`${url}/${petData.id}`);

        expect(response.status()).toBe(200);

        // Verify pet is deleted (should return 404)
        const secondResponse = await request.delete(`${url}/${petData.id}`);
        expect(secondResponse.status()).toBe(404);
    });
});