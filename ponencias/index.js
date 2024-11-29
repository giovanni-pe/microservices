const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Use the CORS middleware
app.use(cors());

// Replace with your actual target endpoint
const targetEndpoint = 'http://localhost:443';  // Cronograma endpoint

app.get('/', async (req, res) => {
    const startTime = Date.now();  // Record the time when the request is received
    let targetResponseTime = 0;
    let statusCode = 200;  // Default to OK status code

    try {
        // Make a request to the other endpoint (cronograma)
        const responseStartTime = Date.now();
        const response = await axios.get(targetEndpoint);
        targetResponseTime = Date.now() - responseStartTime;  // Calculate response time
    } catch (error) {
        console.error('Error calling Beta endpoint:', error.message);
        statusCode = 500;  // If there's an error, set status code to 500 (Internal Server Error)
        return res.status(statusCode).json({
            error: 'Error calling Beta endpoint',
            message: error.message || 'There was an issue connecting to the cronograma.',
            startTime: startTime,
        });
    }

    const latency = Date.now() - startTime;  // Calculate latency from request to response

    res.status(statusCode).json({
        message: 'Cronograma response',
        startTime: startTime,
        latency: latency,  // Latency in ms from request to response
        targetResponseTime: targetResponseTime,  // Latency of the cronograma endpoint response
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
