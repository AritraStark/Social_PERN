import pg from 'pg'

const { Pool } = pg

//This is for development mode in localhost
const devConfig = `postgresql://${ process.env.PG_USER }:${ process.env.PG_PASSWORD }@${ process.env.PG_HOST }:${ process.env.PG_PORT }/${ process.env.PG_DATABASE }`;

//This env var comes from postgres heroku addon
const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString:
        process.env.NODE_ENV === "production" ? proConfig : devConfig,
})

const query = (text, params) => pool.query(text, params)

export default query