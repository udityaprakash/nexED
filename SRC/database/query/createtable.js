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

const createDB = `create database if not exists GclassroomDB;`;  

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
  join_code VARCHAR(7) UNIQUE NOT NULL,
  email VARCHAR(255) REFERENCES customer(email),
  banner_id VARCHAR(64) NOT NULL,
  created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const enrolement = `CREATE TABLE IF NOT EXISTS enrollment (
  class_id uuid REFERENCES class(class_id),
  email VARCHAR(255) REFERENCES customer(email),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
  `;

const classResource = `CREATE TABLE IF NOT EXISTS ficher (
  ficher_id uuid PRIMARY KEY,
  class_id uuid REFERENCES class(class_id),
  title VARCHAR(64),
  description VARCHAR(512),
  mediaAsset_ids text[],
  created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;  

const fichercomment = `CREATE TABLE IF NOT EXISTS ficher (
    comment_id uuid PRIMARY KEY,
    ficher_id uuid REFERENCES ficher(ficher_id) NOT NULL,
    email VARCHAR(255) REFERENCES customer(email) NOT NULL,
    comment VARCHAR(512) NOT NULL,
    created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

async function createAllTables(){
    const cli = await client();
    // await cli.run.query(createDB).then(()=>{
    //   console.log('DB created');
    // }).catch((err)=>{
    //   console.log("DB not created as : "+err);
    // });

    await cli.run.query(User).then(()=>{
      console.log('customer table created');
    }).catch((err)=>{
      console.log("customer table not created as : "+err);
    });
    
    await cli.run.query(classes).then(()=>{
      console.log('class table created');
    }).catch((err)=>{
      console.log("class table not created as : "+err);
    });

    await cli.run.query(enrolement).then(()=>{
      console.log('Enrollment table created');
    }).catch((err)=>{
      console.log("Enrollment table not created as : "+err);
    });

    await cli.run.query(classResource).then(()=>{
      console.log('Ficher table created');
    }).catch((err)=>{
      console.log("Ficher table not created as : "+err);
    });

    await cli.run.query(fichercomment).then(()=>{
      console.log('Fichercomment table created');
    }).catch((err)=>{
      console.log("Fichercomment table not created as : "+err);
    });
}  

module.exports = {createAllTables}