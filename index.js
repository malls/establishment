const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path')

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/index2.html')));
app.get('/runway', (req, res) => res.sendFile(path.join(__dirname + '/public/index2.html')));
app.get('/project-highlight', (req, res) => res.sendFile(path.join(__dirname + '/public/index2.html')));
app.get('/runway-highlight', (req, res) => res.sendFile(path.join(__dirname + '/public/index2.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname + '/public/index2.html')));
app.get('/archive', (req, res) => res.sendFile(path.join(__dirname + '/public/index2.html')));

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
