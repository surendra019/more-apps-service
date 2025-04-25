const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


// Serve all files in the current directory
app.use(express.static(__dirname));

app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'd.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data.json' });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      res.status(500).json({ error: 'Invalid JSON format in data.json' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
