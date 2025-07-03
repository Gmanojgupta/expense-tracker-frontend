const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const buildPath = path.join(__dirname, 'build');

if (!fs.existsSync(buildPath)) {
  console.error('❌ React build folder not found at:', buildPath);
  process.exit(1);
}

app.use(express.static(buildPath));

app.get('/*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`✅ React app running at http://localhost:${port}`);
});
