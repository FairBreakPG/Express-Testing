const request = require('supertest');
const app = require('../index'); 

describe('Pruebas para la API de cafés', () => {

    it('GET /cafes devuelve status 200 y un arreglo con al menos un objeto', async () => {
        const response = await request(app).get('/cafes');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('DELETE /cafes/:id con un id que no existe devuelve status 404', async () => {
        const response = await request(app)
            .delete('/cafes/999') 
            .set('Authorization', 'Bearer token');
        expect(response.statusCode).toBe(404);
    });

    it('POST /cafes agrega un nuevo café y devuelve status 201', async () => {
        const nuevoCafe = { id: 5, nombre: 'Latte' };
        const response = await request(app)
            .post('/cafes')
            .send(nuevoCafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(nuevoCafe);
    });

    it('PUT /cafes devuelve status 400 si los ids no coinciden', async () => {
        const cafeModificado = { id: 2, nombre: 'Café Modificado' };
        const response = await request(app)
            .put('/cafes/1')
            .send(cafeModificado);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('El id del parámetro no coincide con el id del café recibido');
    });
    
});
