const express = require('express');
const {createAllTables} = require('./SRC/database/query/createtable');
const {connectmongoDB} = require('./SRC/database/connections/mongoDB');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 8080;

createAllTables();
connectmongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', require('./SRC/routers/adminroute'));
app.use('/auth', require('./SRC/routers/authroutes'));
app.use('', require('./SRC/routers/otherroutes'));

app.all('*', (req, res) => {
  res.status(404).json({error:true, message: 'Page not found'});
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
