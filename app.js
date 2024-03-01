const express = require('express');
const {createAllTables} = require('./SRC/database/query/createtable');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 8080;

createAllTables();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', require('./routes/getroutes'));
app.use('/auth', require('./SRC/routers/authroutes'));

app.all('*', (req, res) => {
  res.status(404).json({error:true, message: 'Page not found'});
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
