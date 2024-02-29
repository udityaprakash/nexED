const {QueryExecuter} = require('../connections/postgreSQL');

async function Retry(query) {
    try {
      var re =await QueryExecuter(query);
      if(!re.error){
        // console.log('re',re.data);
        // console.log("query executed successfully for :- "+ query);
        return;
      }else{
        console.log('error: ',re.error,'that is : ',re.data);
      }
    } catch (error) {
      console.error('Retrying Query...',error);
      Retry(query);
    }
  }

const User = `
CREATE TABLE IF NOT EXISTS customer (
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