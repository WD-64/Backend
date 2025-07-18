import pg from 'pg';
const { Client } = pg;

export const getAllProducts = async (req, res) => {
  try {
    const client = new Client({
      connectionString: process.env.NEON_URI,
    });
    await client.connect();

    const results = await client.query('SELECT * FROM products;');
    await client.end();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results.rows));
  } catch (error) {
    console.log(error);
  }
};
