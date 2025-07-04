const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // ✅ USA require con node-fetch v2

const app = express();
app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzgBp1XQqUdMng3zQ3FuUopmAK2nzedUqK_2T7eL26a9Xza4sYn39SyIUXuWOvwRJI4/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      }
    );

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error('❌ Errore proxy:', err);
    res.status(500).json({ error: 'Errore proxy: ' + err.message });
  }
});

app.listen(4000, () => {
  console.log('✅ Proxy attivo su http://localhost:4000');
});
