const express = require('express');
const cors = require('cors');
const body = require('body-parser');
const { spawn} = require('child_process');
const multer = require('multer');
const fs = require('fs');
const path = require('path')


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

// --- STT (Whisper.cpp) ---

const upload = multer({dest: path.join(__dirname, '../tmp')});
app.post('/api/stt', upload.single('audio'), async (req, res) => {
    try {
        const inFile = req.file.path;
        const wavFile = `${inFile}.wav`;
        const outPrefix = `${inFile}.out`;
        // convert to wav 16 kHz mono
        const ff = spawn('ffmpeg', ['-y', '-i', inFile, '-ar', '16000', '-ac', '1', wavFile]);
        ff.on('close', () => {
            // whisper.cpp inference
            const whisperBin = path.join(__dirname, './models/whisper/whisper.cpp/main');
            const modelPath = path.join(__dirname, './models/whisper/whisper.cpp/models/ggml-base.bin')
            const wp
        })
    } catch (e) {
        
    }
})





app.listen( PORT, () => console.log('API listening on', PORT));