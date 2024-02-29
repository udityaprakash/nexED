const pool = require('../connections/postgreSQL');

async function Retry(query) {
    try {
      var Query = query;
      var re = await pool.query(Query);
      console.log("query executed successfully for :- "+ Query);
    } catch (error) {
      console.error('Retrying Query...');
      Retry(query);
    }
  }

const User = `
CREATE TABLE IF NOT EXISTS user(
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(255),
    profile_url VARCHAR(512),
    email VARCHAR(255) UNIQUE CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    user_type VARCHAR(5) DEFAULT 'U00' CHECK (user_type IN ('U30', 'U365','UNL','U00')),
    created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

async function createAllTables(){
    await Retry(User);
}  

module.exports = {createAllTables}