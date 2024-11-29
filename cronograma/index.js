const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Use the CORS middleware
app.use(cors());

// Define a basic route for the cronograma de conferencias
app.get('/', (req, res) => {
    const startTime = Date.now();  // Time when the request is received

    // Simulate processing (if necessary, you can add other logic here)
    setTimeout(() => {
        const latency = Date.now() - startTime;  // Calculate latency (time from request to response)
        res.json({
            message: 'Cronograma de conferencias',
            startTime: startTime,
            latency: latency,  // Latency in ms
        });
    }, 100);  // Simulated delay (you can adjust or remove it)
});

// Global error handler middleware
app.use((err, req, res, next) => {
    const startTime = Date.now();  // Record time when error happens

    console.error(err.stack);  // Log the error stack for debugging

    const latency = Date.now() - startTime;  // Latency during error processing

    res.status(500).json({
        service: 'cronograma',
        error: 'Internal Server Error',
        message: err.message || 'Something went wrong!',
        startTime: startTime,
        latency: latency,  // Latency in ms during error
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
