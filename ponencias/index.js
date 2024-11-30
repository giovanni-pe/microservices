const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware CORS
app.use(cors());

// Variable para determinar si se usan datos locales
const useLocalService = true; 

// Endpoint externo
const localService = 'http://beta-service:3001';

app.get('/', async (req, res) => {
    const requestStartTime = Date.now();
    let cronogramaToPonenciaLatency = 0;
    let statusCode = 200;
    let combinedResponse = {};

    try {
        if (useLocalService) {
             // Si no se usa datos locales, realiza la consulta al endpoint externo
             console.log('Realizando consulta al endpoint externo...');
             const cronogramaRequestStartTime = Date.now();
             const cronogramaResponse = await axios.get(localService);
             cronogramaToPonenciaLatency = Date.now() - cronogramaRequestStartTime;
             const totalRequestLatency = Date.now() - requestStartTime;
             combinedResponse = {
                service: "ponencias",
                 ...cronogramaResponse.data,
                 message: cronogramaResponse.data.message || 'Cronograma de conferencias',
                 cronogramaToPonenciaLatency,
                 totalRequestLatency,
                 requestStartTime,
             };
           
        } else {
            // Si se usa datos locales, devolvemos un mensaje simulado
            console.log('Usando datos locales simulados...');
            combinedResponse = {
                message: 'Datos locales: Cronograma de conferencias',
                cronogramaToPonenciaLatency: 0,
                totalRequestLatency: 0,
                requestStartTime: requestStartTime,
            };
        }

        res.status(statusCode).json(combinedResponse);
    } catch (error) {
        console.error('Error llamando al endpoint externo:', error.message);
        statusCode = 500; // Código de error interno
        return res.status(statusCode).json({
            service: 'ponencias',
            error: 'Error llamando al endpoint externo',
            message: error.message || 'Hubo un problema al conectar con el cronograma.',
            requestStartTime: requestStartTime,
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
