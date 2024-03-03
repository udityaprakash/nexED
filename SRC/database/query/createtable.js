const {client} = require('../connections/postgreSQL');

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

const classes = `CREATE TABLE IF NOT EXISTS class (
  class_id uuid PRIMARY KEY,
  class_name VARCHAR(64) NOT NULL,
  subject VARCHAR(64),
  section VARCHAR(64),
  description VARCHAR(512),
  can_join BOOLEAN DEFAULT TRUE,
  email VARCHAR(255) REFERENCES customer(email),
  banner_id bytea NOT NULL, 
  created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

async function createAllTables(){
    const cli = await client();
    await cli.run.query(User).then(()=>{
      console.log('customer table created');
    }).catch((err)=>{
      console.log("table not created as : "+err);
    });
    
    await cli.run.query(classes).then(()=>{
      console.log('class table created');
    }).catch((err)=>{
      console.log("table not created as : "+err);
    });
}  

module.exports = {createAllTables}