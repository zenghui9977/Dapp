const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('app'));

app.use(express.static('build/contracts'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/app/index.html`);
});

app.get('*', (req, res) => {
  res.status(404);
  res.send('Ooops... this URL does not exist');
});

app.listen(PORT, () => {
  console.log(`Notepad running on port ${PORT}...`);
});