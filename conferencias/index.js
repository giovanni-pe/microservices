const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Variable externa para decidir el flujo
const useExternalApi =true; // Cambia a `false` para seguir el flujo actual

// Endpoints de las APIs
const LanEndPoint = 'http://18.226.34.74';
const externalApiEndpoint = 'http://13.59.245.63:3000';

app.use(cors());

app.get('/', async (req, res) => {
    const startTime = Date.now(); // Registro de la hora de inicio de la solicitud
    let targetResponseTime = 0;
    let statusCode = 200;
    let apiResponseData = {}; // Almacenará la respuesta de la API

    try {
        const responseStartTime = Date.now();

        if (useExternalApi) {
            // Si la variable externa es verdadera, llama a la API en puerto 3000
            console.log('Usando la API externa...');
            const externalResponse = await axios.get(externalApiEndpoint);
            apiResponseData = externalResponse.data; // Almacena los datos de la API externa
        } else {
            // Flujo normal, llama al endpoint configurado
            console.log('Usando el flujo normal...');
            const response = await axios.get(LanEndPoint);
            apiResponseData = response.data; // Almacena los datos de la API normal
        }

        targetResponseTime = Date.now() - responseStartTime; // Latencia de la respuesta de la API
    } catch (error) {
        console.error('Error al llamar a la API:', error.message);
        statusCode = 500; // Si ocurre un error, establece el código de estado a 500 (Error interno del servidor)
        return res.status(statusCode).json({
            error: 'Error al llamar a la API',
            message: error.message,
            startTime: startTime,
        });
    }

    const latency = Date.now() - startTime; // Latencia total de la solicitud

    res.status(statusCode).json({
        sevice:"conferences",
        message: 'Respuesta combinada',
        startTime: startTime,
        latency: latency, // Latencia total
        targetResponseTime: targetResponseTime, // Latencia de la API objetivo
        apiResponseData: apiResponseData, // Datos de la API utilizada
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
