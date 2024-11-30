const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Use the CORS middleware
app.use(cors());

// Replace with your actual target endpoint
const targetEndpoint = 'http://0.0.0.0:443';  

app.get('/', async (req, res) => {
    const requestStartTime = Date.now();
    let cronogramaToPonenciaLatency = 0;
    let statusCode = 200;  

    try {
        const cronogramaRequestStartTime = Date.now();
        const cronogramaResponse = await axios.get(targetEndpoint);
        cronogramaToPonenciaLatency = Date.now() - cronogramaRequestStartTime;
        const totalRequestLatency = Date.now() - requestStartTime;
        const combinedResponse = {
            ...cronogramaResponse.data, 
            message: cronogramaResponse.data.message || 'Cronograma de conferencias',
            cronogramaToPonenciaLatency,  
            totalRequestLatency,  
            requestStartTime,  
        };

        // Send the combined response back to the client
        res.status(statusCode).json(combinedResponse);

    } catch (error) {
        console.error('Error calling cronograma endpoint:', error.message);
        statusCode = 500;  // If there's an error, set status code to 500 (Internal Server Error)
        return res.status(statusCode).json({
            service: 'ponencias',
            error: 'Error calling cronograma endpoint',
            message: error.message || 'There was an issue connecting to the cronograma.',
            requestStartTime: requestStartTime,
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
