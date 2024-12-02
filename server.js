const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Parse JSON bodies
app.use(express.json());

// Simple rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

// Proxy endpoint for Ollama
app.post('/api/generate', async (req, res) => {
    try {
        // Check rate limit
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        
        if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
            const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        lastRequestTime = Date.now();

        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ollama API error: ${response.statusText}\n${errorText}`);
        }

        const data = await response.json();
        
        if (!data.response) {
            throw new Error('No response from Ollama');
        }

        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        
        // Check for rate limit error
        if (error.message.includes('rate limit')) {
            res.status(429).json({
                error: 'Rate limit exceeded. Please wait a moment before trying again.',
                retryAfter: 60 // seconds
            });
        } else {
            res.status(500).json({ 
                error: error.message,
                details: error.stack
            });
        }
    }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        if (!response.ok) {
            throw new Error('Ollama not responding');
        }
        const data = await response.json();
        res.json({ 
            status: 'ok',
            ollama: 'connected',
            models: data.models
        });
    } catch (error) {
        res.status(503).json({ 
            status: 'error',
            message: 'Ollama not available',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
