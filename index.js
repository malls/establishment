const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.redirect('/index2.html'));

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
