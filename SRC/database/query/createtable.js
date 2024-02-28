const pool = require('../connections/postgreSQL');

async function Retry(query) {
    try {
      var Query = query;
      var re = await pool.query(Query);
      console.log("query executed successfully for :- "+ Query);
    } catch (error) {
      console.error('Error retrying');
      Retry(query);
    }
  }

const User = `
CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(255),
    profile_url VARCHAR(600),
    email VARCHAR(255)
  );`;

async function createAllTables(){
    await Retry(User);
}  

module.exports = {createAllTables}