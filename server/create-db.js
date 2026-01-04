import pg from 'pg';

const { Client } = pg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'sujin',
  database: 'postgres', // connect to default database to create new one
});

async function createDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Check if database exists
    const res = await client.query("SELECT datname FROM pg_database WHERE datname = 'earthmovers_db'");
    if (res.rows.length > 0) {
      console.log('Database earthmovers_db already exists');
    } else {
      await client.query('CREATE DATABASE earthmovers_db');
      console.log('Database earthmovers_db created successfully');
    }
  } catch (error) {
    console.error('Error creating database:', error.message);
  } finally {
    await client.end();
  }
}

createDatabase();