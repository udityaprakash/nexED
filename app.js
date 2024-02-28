const express = require('express');
const getroutes = require('./routes/getroutes');
const app = express();
const port = 3000;
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', getroutes);

app.all('*', (req, res) => {
  res.status(404).json({error:true, message: 'Page not found'});
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
