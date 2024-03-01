const { Pool } = require('pg');

require('dotenv').config();

var client =async () => {
        try{

            const poll = new Pool({
                connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
                // max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 10000,
                ssl: {
                    rejectUnauthorized: false, 
                  },
            });
            var client = await poll.connect();
            console.log('Database query executed...');
            return {error:false,status:0,run:client};
        }catch(err){
            console.error('Database connection failed');
            if(err.code === 'PROTOCOL_CONNECTION_LOST'){
                console.error('Database connection was closed');
            }
            if(err.code === 'ER_CON_COUNT_ERROR'){
                console.error('Database has too many connections');
            }
            if(err.code === 'ECONNREFUSED'){
                console.error('Database connection was refused');
            }
            console.log('error: ',err);
            return {error: true, status:1, data:err};
        }
    }

module.exports = {client};