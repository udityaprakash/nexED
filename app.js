const express = require('express');
const {createAllTables} = require('./SRC/database/query/createtable');
const app = express();
const port = 3000;
require('dotenv').config();

createAllTables();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', require('./routes/getroutes'));
app.use('/auth', require('./routes/authroutes'));

app.all('*', (req, res) => {
  res.status(404).json({error:true, message: 'Page not found'});
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
