const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    ssl: {
        rejectUnauthorized: false, 
      },
}).then(() => console.log('Connected to PostgreSQL')).catch((err) => {
    console.log(err);
    return 1;
});

module.export = pool;