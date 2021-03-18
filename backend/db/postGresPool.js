import pg from 'pg'

const { Pool } = pg

//This is for development mode in localhost
const devConfig = `postgresql://${ process.env.PGUSER }:${ process.env.PGPASSWORD }@${ process.env.PGHOST }:${ process.env.PGPORT }/${ process.env.PGDATABASE }`;

//This env var comes from postgres heroku addon
const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString:
        process.env.NODE_ENV === "production" ? proConfig : devConfig,
    ssl: {
        rejectUnauthorized: false
    }
})

const query = (text, params) => pool.query(text, params)

export default query