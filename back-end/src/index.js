const express = require('express');
const cors = require('cors');
const body = require('body-parser');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const PORT = process.env.PORT || 3001;



const app = express();
app.use(cors);
app.use(body.json({limit: '10mb'}));





app.listen( PORT, () => console.log('API listening on', PORT));