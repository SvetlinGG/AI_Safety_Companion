const express = require('express');
const cors = require('cors');
const body = require('body-parser');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const PORT = process.env.PORT || 3001;



const app = express();
app.use(cors);
app.use(body.json({limit: '10mb'}));

app.get('/api/health', (req, res) => res.json({ok: true}));

// --- LLM ( Ollama chat) ---

app.post('/api/ask', async (req, res) => {
    try {
        const { question, context} = req.body;
        const body = {
            model: 'llama3.1:8b-instruct-q4_K_M',
            messages: [
                { role: 'system', content:
                    'You are an OFFLINE emergency assistant. Answer with short, step-by-step, safety-first instructions. If life-threatening: CALL EMERGENCY IMMEDIATELY.'},
                { role: 'user', content: `${context ? `Context:\n${context}\n\n` : ''}Question: ${question}`}
            ],
            stream: false
        };
        const r = await fetch(`${OLLAMA_URL}/api/chat`, {
            method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(body)
        });
        const data = await r.json();
        res.json({answer: data?.message?.content || ''});
    } catch (e) {
        res.status(500).json({error: e.message})
    }
});





app.listen( PORT, () => console.log('API listening on', PORT));