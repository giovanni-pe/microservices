const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Replace with your actual target endpoint
const targetEndpoint = 'http://18.227.49.198';  

app.get('/', async (req, res) => {
    const startTime = Date.now();  // Registro de la hora de inicio de la solicitud
    let targetResponseTime = 0;
    let statusCode = 200;  

    try {
        const responseStartTime = Date.now();
        const response = await axios.get(targetEndpoint); 
        targetResponseTime = Date.now() - responseStartTime;  // Latencia de la respuesta del endpoint de destino
    } catch (error) {
        console.error('Error calling cronograma endpoint:', error.message);
        statusCode = 500;  // Si ocurre un error, establecemos el código de estado a 500 (Error interno del servidor)
        return res.status(statusCode).json({
            error: 'Error calling cronograma endpoint',
            message: error.message,
            startTime: startTime,
        });
    }

    const latency = Date.now() - startTime;  

    res.status(statusCode).json({
        message: 'Conferencias Response',
        startTime: startTime,
        latency: latency,  
        targetResponseTime: targetResponseTime, 
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
