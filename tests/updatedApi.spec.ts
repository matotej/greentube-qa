import { test, expect, request, APIRequestContext } from '@playwright/test';
import { afterEach, beforeEach } from 'node:test';

test.describe('Petstore API Tests with Playwright', () => {
    const BASE_URL = 'https://petstore.swagger.io/v2';
    const HEADERS = {
        'Content-Type': 'application/json',
        'api_key': 'special-key',
    };

    // Sample pet data for POST and PUT requests
    const petData = {
        id: 23874560231, // Use a unique integer ID
        category: {
            id: 1,
            name: 'Dogs'
        },
        name: 'Fido-matotej',
        photoUrls: ['https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/18d0/live/88ff5600-d979-11ef-a5c8-1da73bd59591.jpg'],
        tags: [
        {
            id: 1,
            name: 'friendly'
        }
        ],
        status: 'available'
    };

    // Updated pet data for PUT request
    const updatedPetData = {
        ...petData,
        name: 'Max-matotej',
        status: 'sold',
    };

    let context: APIRequestContext;
    let petId: number;



    beforeEach(async () => {
        // Initialize request context
        context = await request.newContext({
        baseURL: BASE_URL,
        extraHTTPHeaders: HEADERS,
        });

        // Create a pet for testing
        const response = await context.post('/pet', { data: petData });
        expect(response.status(), `POST failed with status ${response.status()}`).toBe(200);
        const responseData = await response.json();
        petId = responseData.id;
        expect(petId, 'Pet ID not returned in POST response').toBe(petData.id);
    });

    afterEach(async () => {
        // Cleanup: Delete the pet and dispose context
        if (petId) {
        await context.delete(`/pet/${petId}`);
        }
        await context.dispose();
    });

    test('POST /pet - Create a new pet (Status 200)', async () => {
        const response = await context.post('/pet', { data: petData });
        const responseData = await response.json();

        // Assert status code
        expect(response.status(), `Expected 200, got ${response.status()}`).toBe(200);

        // Assert response data
        expect(responseData.id, 'Pet ID mismatch').toBe(petData.id);
        expect(responseData.name, 'Pet name mismatch').toBe(petData.name);
        expect(responseData.status, 'Pet status mismatch').toBe(petData.status);
        expect(responseData.category.name, 'Category name mismatch').toBe(petData.category.name);
    });

    test('GET /pet/{petId} - Retrieve pet and verify POST data (Status 200)', async () => {
        const response = await context.get(`/pet/${petId}`);
        const responseData = await response.json();

        // Assert status code
        expect(response.status(), `Expected 200, got ${response.status()}`).toBe(200);

        // Assert data consistency with POST
        expect(responseData.id, 'Pet ID mismatch').toBe(petData.id);
        expect(responseData.name, 'Pet name mismatch').toBe(petData.name);
        expect(responseData.category.name, 'Category name mismatch').toBe(petData.category.name);
        expect(responseData.status, 'Pet status mismatch').toBe(petData.status);
    });

    test('PUT /pet - Update existing pet (Status 200)', async () => {
        const response = await context.put('/pet', { data: UPDATED_petData });
        const responseData = await response.json();

        // Assert status code
        expect(response.status(), `Expected 200, got ${response.status()}`).toBe(200);

        // Assert updated data
        expect(responseData.name, 'Updated name mismatch').toBe(UPDATED_petData.name);
        expect(responseData.status, 'Updated status mismatch').toBe(UPDATED_petData.status);
    });

    test('DELETE /pet/{petId} - Delete pet (Status 200)', async () => {
        const response = await context.delete(`/pet/${petId}`);

        // Assert status code
        expect(response.status(), `Expected 200, got ${response.status()}`).toBe(200);

        // Verify pet is deleted (should return 404)
        const getResponse = await context.get(`/pet/${petId}`);
        expect(getResponse.status(), `Expected 404, got ${getResponse.status()}`).toBe(404);
    });

    test('GET /pet/{petId} - Non-existent pet (Status 404)', async () => {
        const response = await context.get('/pet/999999999');

        // Assert status code
        expect(response.status(), `Expected 404, got ${response.status()}`).toBe(404);
    });

    test('POST /pet - Invalid input (Status 400)', async () => {
        const invalidPetData = { id: 'invalid', name: '' }; // Malformed data
        const response = await context.post('/pet', { data: invalidPetData });

        // Assert status code
        expect(response.status(), `Expected 400, got ${response.status()}`).toBe(400);
    });
});