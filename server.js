const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'scores.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize scores file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ saloni: 0, zaid: 0 }));
}

app.use(express.json());

// Serve static files from the project root
app.use(express.static(__dirname));

// GET scores
app.get('/api/scores', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.json({ saloni: 0, zaid: 0 });
    }
});

// POST update a score
app.post('/api/scores', (req, res) => {
    const { player, action } = req.body;

    if (!['saloni', 'zaid'].includes(player) || !['plus', 'minus'].includes(action)) {
        return res.status(400).json({ error: 'Invalid player or action' });
    }

    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

        if (action === 'plus') {
            data[player]++;
        } else {
            data[player]--;
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(data));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update scores' });
    }
});

app.listen(PORT, () => {
    console.log(`Valentine's Day server running at http://localhost:${PORT}`);
});
